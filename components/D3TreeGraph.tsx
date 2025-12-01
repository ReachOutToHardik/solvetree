import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TreeNode } from '../types';

interface D3TreeProps {
  data: TreeNode;
}

// Extend D3's type to include our custom _children property for collapsing
interface ExtendedHierarchyNode extends d3.HierarchyNode<TreeNode> {
  _children?: ExtendedHierarchyNode[];
  x0?: number;
  y0?: number;
  x?: number;
  y?: number;
}

const D3TreeGraph: React.FC<D3TreeProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle resize
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

    const { width, height } = dimensions;
    const isMobile = width < 600;
    
    // Card Dimensions
    const cardWidth = isMobile ? 180 : 260;
    const cardHeight = isMobile ? 100 : 140;
    const hGap = isMobile ? 40 : 80;
    const vGap = isMobile ? 20 : 40;

    // Margins & Spacing
    const margin = { top: 20, right: 120, bottom: 20, left: isMobile ? 60 : 120 };
    const dy = cardWidth + hGap; // Horizontal spacing between levels
    const dx = cardHeight + vGap;   // Vertical spacing between nodes

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create hierarchy
    const root = d3.hierarchy(data) as ExtendedHierarchyNode;
    
    // Initialize positions
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse all nodes after depth 1 initially
    const collapse = (d: ExtendedHierarchyNode) => {
      if (d.children) {
        d._children = d.children as ExtendedHierarchyNode[];
        d._children.forEach(collapse);
        d.children = null;
      }
    };
    
    // Only keep the first level expanded initially
    if (root.children) {
      root.children.forEach(collapse);
    }

    // Tree Layout
    const tree = d3.tree<TreeNode>().nodeSize([dx, dy]);

    // Update Function
    const update = (source: ExtendedHierarchyNode) => {
      const duration = 400;

      // Compute the new tree layout.
      tree(root);

      // Get nodes and links
      const nodes = root.descendants();
      const links = root.links();

      // Normalize for fixed-depth.
      nodes.forEach(d => {
        d.y = d.depth * dy;
      });

      // ****************** Nodes ******************

      // Update the nodes...
      const node = g.selectAll<SVGGElement, ExtendedHierarchyNode>('g.node')
        .data(nodes, d => d.id || (d.id = Math.random().toString()));

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${source.y0},${source.x0})`)
        .on('click', (event, d) => {
          // Toggle children on click
          if (d.children) {
            d._children = d.children as ExtendedHierarchyNode[];
            d.children = null;
          } else {
            d.children = d._children;
            d._children = undefined;
          }
          update(d);
        });

      // Add Card (ForeignObject)
      // Positioned so the node point (d.y, d.x) is at the LEFT-CENTER of the card
      nodeEnter.append("foreignObject")
        .attr("width", cardWidth)
        .attr("height", cardHeight)
        .attr("x", 0)
        .attr("y", -cardHeight / 2)
        .style("opacity", 0) // Start hidden
        .append("xhtml:div")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", isMobile ? "10px" : "12px")
        .style("color", "#334155")
        .style("width", `${cardWidth}px`)
        .style("height", `${cardHeight}px`)
        .html(d => `
          <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-200 hover:border-sky-400 transition-all w-full h-full flex flex-col justify-start relative group overflow-hidden">
            <strong class="block text-slate-900 mb-1 leading-tight text-sm line-clamp-2">${d.data.name}</strong>
            ${d.data.details ? `<span class="text-slate-500 line-clamp-4 leading-snug text-xs">${d.data.details}</span>` : ''}
          </div>
        `);

      // Add Expander Circle (only if children exist)
      // Positioned at the RIGHT-CENTER of the card
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('cx', cardWidth)
        .attr('cy', 0)
        .attr('r', 1e-6)
        .style('fill', d => d._children ? '#0ea5e9' : '#fff')
        .style('stroke', '#0ea5e9')
        .style('stroke-width', 2)
        .style('cursor', 'pointer')
        .style('display', d => (d.children || d._children) ? 'block' : 'none');

      // UPDATE
      const nodeUpdate = nodeEnter.merge(node);

      // Transition to the proper position for the node
      nodeUpdate.transition().duration(duration)
        .attr('transform', d => `translate(${d.y},${d.x})`);

      // Update the circle attributes
      nodeUpdate.select('circle.node')
        .attr('r', 6)
        .style('fill', d => d._children ? '#0ea5e9' : '#fff')
        .style('display', d => (d.children || d._children) ? 'block' : 'none');
      
      // Fade in text
      nodeUpdate.select("foreignObject")
        .transition().duration(duration)
        .style("opacity", 1);

      // EXIT
      // Remove any exiting nodes
      const nodeExit = node.exit().transition().duration(duration)
        .attr('transform', d => `translate(${source.y},${source.x})`)
        .remove();

      nodeExit.select('circle')
        .attr('r', 1e-6);

      nodeExit.select('foreignObject')
        .style("opacity", 0);

      // ****************** Links ******************

      // Update the links...
      const link = g.selectAll<SVGPathElement, d3.HierarchyLink<TreeNode>>('path.link')
        .data(links, d => (d.target as any).id);

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', d => {
          const o = { x: source.x0 || 0, y: source.y0 || 0 };
          // Start from right edge of parent (approx)
          const startX = (source.y0 || 0) + cardWidth;
          const startY = (source.x0 || 0);
          return `M${startX},${startY}C${startX},${startY} ${startX},${startY} ${startX},${startY}`;
        })
        .attr("fill", "none")
        .attr("stroke", "#cbd5e1")
        .attr("stroke-width", 2);

      // UPDATE
      const linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate.transition().duration(duration)
        .attr('d', d => {
            const sourceX = d.source.y + cardWidth;
            const sourceY = d.source.x;
            const targetX = d.target.y;
            const targetY = d.target.x;
            
            // Cubic Bezier with control points
            return `M${sourceX},${sourceY}
                    C${(sourceX + targetX) / 2},${sourceY}
                     ${(sourceX + targetX) / 2},${targetY}
                     ${targetX},${targetY}`;
        });

      // EXIT
      link.exit().transition().duration(duration)
        .attr('d', d => {
          const o = { x: source.x, y: source.y };
          const startX = o.y + cardWidth;
          return `M${startX},${o.x}C${startX},${o.x} ${startX},${o.x} ${startX},${o.x}`;
        })
        .remove();

      // Store the old positions for transition.
      nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    // Initial Update
    update(root);

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
    
    // Center the tree initially
    const initialTransform = d3.zoomIdentity
      .translate(margin.left, height / 2 - (root.x || 0))
      .scale(1);
    svg.call(zoom.transform, initialTransform);

  }, [data, dimensions]);

  return (
    <div ref={containerRef} className="w-full h-[600px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden relative shadow-inner touch-none">
      <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg text-xs font-medium text-slate-500 z-10 pointer-events-none border border-slate-100 shadow-sm flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
        Click nodes to expand
      </div>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} className="cursor-grab active:cursor-grabbing"></svg>
    </div>
  );
};

export default D3TreeGraph;
