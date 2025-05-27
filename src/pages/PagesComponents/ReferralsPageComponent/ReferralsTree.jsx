import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function ReferralsTree({
  data, zoomLevel, setZoomLevel,
  expandAllCount, collapseAllCount, searchTerm
}) {
  const svgRef = useRef();
  const nodeIdRef = useRef(0);
  const zoomBehavior = d3.zoom().on("zoom", e => {
    d3.select(svgRef.current).select("g")
      .attr("transform", e.transform);
    setZoomLevel(e.transform.k);
  });

  // collapse/expand helpers
  const collapseAll = node => {
    if (node.children) {
      node._children = node.children;
      node._children.forEach(collapseAll);
      node.children = null;
    }
  };
  const expandAll = node => {
    if (node._children) {
      node.children = node._children;
      node.children.forEach(expandAll);
      node._children = null;
    } else if (node.children) {
      node.children.forEach(expandAll);
    }
  };

  useEffect(() => {
    if (!data) return;
    const resize = () => {
      const svgEl = svgRef.current;
      if (!svgEl) return;
      d3.select(svgEl).selectAll("*").remove();
      const cw = svgEl.parentElement.clientWidth;
      const margin = {
        top: 20,
        right: cw < 768 ? 40 : 90,
        bottom: 30,
        left: cw < 768 ? 40 : 90
      };
      const w = cw - margin.left - margin.right;
      const h = Math.min(500, w * 0.6) - margin.top - margin.bottom;
      const nodeWidth = cw < 768 ? 80 : 120;
      const nodeHeight = cw < 768 ? 40 : 70;
      const horizontalSpacing = nodeWidth + (cw < 768 ? 20 : 30);
      const verticalSpacing = nodeHeight + (cw < 768 ? 20 : 30);
      const initialScale = 0.8;
      const extraY = 30;

      const treemap = d3.tree()
        .nodeSize([verticalSpacing, horizontalSpacing]);

      const root = d3.hierarchy(data);
      root.x0 = 0; root.y0 = h / 2;

      // apply collapse/expand
      if (collapseAllCount) collapseAll(root);
      if (expandAllCount) expandAll(root);

      const treeData = treemap(root);
      const nodes = treeData.descendants(), links = nodes.slice(1);
      const offsetY = h / 2 - root.x;

      const svg = d3.select(svgEl)
        .call(zoomBehavior)
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          `translate(${margin.left + extraY},${margin.top + offsetY}) scale(${initialScale})`
        );

      const node = svg.selectAll("g.node")
        .data(nodes, d => d.id || (d.id = ++nodeIdRef.current));
      // enter new nodes
      const enter = node.enter()
        .append("g")
        .attr("class", "node")
        // shift group so rect is centered on original x,y
        .attr("transform", d =>
          `translate(${d.y - nodeWidth / 2},${d.x - nodeHeight / 2})`
        );
      // draw rectangle instead of circle
      enter.append("rect")
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("fill", d => d.depth === 0
          ? "rgba(231,151,16,0.2)"
          : "rgba(33,37,41,0.8)")
        .style("stroke", d => d.depth === 0
          ? "rgba(231,151,16,1)"
          : "rgba(55,55,55,1)")
        .style("stroke-width", "2px");
      // center text inside the rect
      enter.append("text")
        .attr("x", nodeWidth / 2)
        .attr("y", nodeHeight / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(d => d.data.username || d.data.name)
        .style("fill", "#fff")
        .style("font-size", cw < 768 ? "10px" : "12px");

      svg.selectAll("path.link")
        .data(links, d => d.id)
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", d => {
          // start at parent’s right edge, end at child’s left edge
          const startX = d.parent.y + nodeWidth / 2;
          const startY = d.parent.x;
          const endX   = d.y - nodeWidth / 2;
          const endY   = d.x;
          const midX   = (startX + endX) / 2;
          // cubic‐Bezier: (start) → (midX,startY) → (midX,endY) → (end)
          return `M${startX},${startY}C${midX},${startY} ${midX},${endY} ${endX},${endY}`;
        })
        .style("fill", "none")
        .style("stroke", "rgba(231,151,16,0.5)")
        .style("stroke-width", "1.5px");

      // if searching, center on match
      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        const match = nodes.find(d =>
          (d.data.username || d.data.name).toLowerCase() === lower
        );
        if (match) {
          const scale = initialScale;
          const tx = margin.left + extraY - match.y * scale;
          const ty = margin.top + h / 2 - match.x * scale;
          const transform = d3.zoomIdentity
            .translate(tx, ty)
            .scale(scale);
          d3.select(svgEl)
            .transition().duration(750)
            .call(zoomBehavior.transform, transform);
        }
      }
    };

    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, [data, expandAllCount, collapseAllCount, searchTerm]);

  return <svg ref={svgRef}></svg>;
}
