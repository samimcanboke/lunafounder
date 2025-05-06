import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function ReferralsTree({ data, zoomLevel, setZoomLevel }) {
  const svgRef = useRef();
  const nodeIdRef = useRef(0);
  const zoomBehavior = d3.zoom()
    .scaleExtent([0.5, 2])
    .on("zoom", e => {
      d3.select(svgRef.current).select("g").attr("transform", e.transform);
    });

  useEffect(() => {
    if (!data) return;
    const resize = () => {
      const svgEl = svgRef.current;
      if (!svgEl) return;
      d3.select(svgEl).selectAll("*").remove();
      const cw = svgEl.parentElement.clientWidth;
      const margin = { top: 20, right: cw < 768 ? 40 : 90, bottom: 30, left: cw < 768 ? 40 : 90 };
      const w = cw - margin.left - margin.right;
      const h = Math.min(500, w * 0.6) - margin.top - margin.bottom;
      const svg = d3.select(svgEl)
        .call(zoomBehavior)
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g").attr("transform", `translate(${margin.left},${margin.top})`);
      const treemap = d3.tree().size([w, h]);
      const root = d3.hierarchy(data);
      root.x0 = w/2; root.y0 = 0;
      const treeData = treemap(root);
      const nodes = treeData.descendants(), links = nodes.slice(1);
      nodes.forEach(d => { d.y = d.depth * (cw<768?70:100); });
      const diagonal = d3.linkVertical().x(d=>d.x).y(d=>d.y);

      const node = svg.selectAll("g.node")
        .data(nodes, d => d.id || (d.id = ++nodeIdRef.current));
      // define box size
      const nodeWidth = cw < 768 ? 80 : 120;
      const nodeHeight = cw < 768 ? 40 : 70;
      // enter new nodes
      const enter = node.enter()
        .append("g")
        .attr("class", "node")
        // shift group so rect is centered on original x,y
        .attr("transform", d =>
          `translate(${d.x - nodeWidth/2},${d.y - nodeHeight/2})`
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
        .data(links, d=>d.id)
        .enter()
        .insert("path","g")
        .attr("class","link")
        .attr("d", d=> diagonal({ source:{x:d.parent.x,y:d.parent.y}, target:{x:d.x,y:d.y} }))
        .style("fill","none")
        .style("stroke","rgba(231,151,16,0.5)")
        .style("stroke-width","1.5px");
    };

    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, [data]);

  return <svg ref={svgRef}></svg>;
}
