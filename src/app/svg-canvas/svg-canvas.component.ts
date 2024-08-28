import { Component, ElementRef, ViewChild, } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-svg-canvas',
  templateUrl: './svg-canvas.component.html',
  styleUrl: './svg-canvas.component.scss'
})

export class SvgCanvasComponent {
  @ViewChild('svgContainer', { static: true }) svgContainer!: ElementRef<SVGSVGElement>;


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.type === 'image/svg+xml') {
        const reader = new FileReader();
        reader.onload = () => {
          const svgText = reader.result as string;
          this.loadSvg(svgText);
        };
        reader.readAsText(file);
      } else {
        alert('Please select a valid SVG file.');
      }
    } else {
      alert('No file selected.');
    }
  }

  loadSvg(svgText: string) {
    d3.select(this.svgContainer.nativeElement).selectAll("*").remove();

    const svgElement = d3.select(this.svgContainer.nativeElement)
      .append('svg')
      .attr('width', 800)
      .attr('height', 600)
      .html(svgText);

    svgElement.selectAll('path, rect, circle')
      .on('mouseover', function () {
        d3.select(this).style('opacity', 0.5);
        d3.select(this).style('cursor', 'pointer');
      })
      .on('mouseout', function () {
        d3.select(this).style('opacity', 1);
      })
      .on('click', function () {
        svgElement.selectAll('path, rect, circle').style('stroke', 'none');
        d3.select(this).style('stroke', 'red').style('stroke-width', '5px');
      });
  }
}