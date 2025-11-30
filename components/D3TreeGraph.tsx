import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TreeNode } from '../types';

interface D3TreeProps {
  data: TreeNode;
}

const D3TreeGraph: React.FC<D3TreeProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: Math.max(600, containerRef.current.clientHeight),
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const { width, height } = dimensions;
    const margin = { top: 40, right: 90, bottom: 50, left: 90 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const root = d3.hierarchy(data);
    
    // Dynamically calculate height based on number of leaves to prevent overlapping
    const leaves = root.leaves().length;
    const dynamicHeight = Math.max(innerHeight, leaves * 120); 

    const treeLayout = d3.tree<TreeNode>().size([dynamicHeight, innerWidth]);
    treeLayout(root);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Links
    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", 2)
      .attr("d", d3.linkHorizontal<any, any>()
        .x(d => d.y)
        .y(d => d.x)
      );

    // Nodes
    const nodes = g.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.y},${d.x})`);

    // Node Circles
    nodes.append("circle")
      .attr("r", 6)
      .attr("fill", "#0ea5e9")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // ForeignObject for HTML text content (better wrapping)
    const foWidth = 200;
    const foHeight = 100;

    nodes.append("foreignObject")
      .attr("width", foWidth)
      .attr("height", foHeight)
      .attr("x", d => d.children ? -foWidth - 15 : 15) // Left if children, right if leaf
      .attr("y", -40) // Center vertically mostly
      .append("xhtml:div")
      .style("font-family", "Inter, sans-serif")
      .style("font-size", "12px")
      .style("color", "#334155")
      .style("text-align", d => d.children ? "right" : "left")
      .html(d => `
        <div class="bg-white/80 p-2 rounded shadow-sm border border-slate-100 backdrop-blur-sm">
          <strong class="block text-slate-900 mb-1">${d.data.name}</strong>
          ${d.data.details ? `<span class="text-xs text-slate-500 line-clamp-3">${d.data.details}</span>` : ''}
        </div>
      `);

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
    
    // Initial centering logic could go here, but default transform is usually okay.

  }, [data, dimensions]);

  return (
    <div ref={containerRef} className="w-full h-[600px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden relative shadow-inner">
      <div className="absolute top-4 right-4 bg-white/90 p-2 rounded text-xs text-slate-500 z-10 pointer-events-none">
        Scroll to zoom • Drag to pan
      </div>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} className="cursor-grab active:cursor-grabbing"></svg>
    </div>
  );
};

export default D3TreeGraph;
