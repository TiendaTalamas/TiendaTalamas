import { Component, Input,HostListener,ViewChild ,ElementRef,Output,EventEmitter,OnInit,Renderer2,AfterViewInit} from '@angular/core';
import { NgFallimgModule } from 'ng-fallimg';
import {Subject} from 'rxjs'
import {debounceTime} from 'rxjs/operators'

@Component({
  selector: 'app-zoom',
  template: `
  <div class="img-zoom-container">
	   <img fallimg #img [style.width]="yet && imgWidth?imgWidth+'%':null" id="myimage" [src]="imagen" (load)="onLoad()">
	   <div #len [style.width]="lenSize+'px'" [style.height]="lenSize+'px'"  [style.left] ="posX+'px'" [style.top] ="posY+'px'"
class="img-zoom-lens">
</div>
  `,
  styles: [`
   .img-zoom-container {
     position: relative;
   }

   .img-zoom-lens {
     position: absolute;
     border: 1px solid #d4d4d4;
   }
   
   @media only screen and (max-width:1024px)
   {
     .img-zoom-lens
     {
     display:none !important;
     }
   }
`]
})
export class ZoomComponent {
  @Input('img') imagen: string;
  @Input() zoom=2;
  @Input() lenSize=40;
  @Input() imgWidth;
  @Input() imgHeigth;
  @Input() divZoomed:ElementRef
  
  posX:number=0;
  posY:number=0;
  cx:number=1;
  cy:number=1;
  yet:boolean=false;
  factorX:number;
  factorY:number;

  
  private mouseMovement = new Subject();

  @ViewChild('img',{static:false,read:ElementRef}) img
  @ViewChild('len',{static:false,read:ElementRef}) lens
  @HostListener('mousemove',['$event'])
  mouseMove(event:any)
  {
    const result=this.moveLens(event);
    this.render.setStyle(this.divZoomed,'background-position',result);

  }

  constructor(private render:Renderer2,public falla:NgFallimgModule){}
  onLoad()
  {
    this.render.setStyle(this.divZoomed, 'display', 'none');
    this.render.setStyle(this.divZoomed,'background-image',"url('" + this.imagen+ "')");
    this.render.setStyle(this.divZoomed,'background-size',(this.img.nativeElement.width * this.zoom) + "px " + (this.img.nativeElement.height * this.zoom) + "px")
    this.render.setStyle(this.divZoomed,'background-repeat', 'no-repeat')
    this.render.setStyle(this.divZoomed,'transition','background-position .2s ease-out');
    this.factorX=this.img.nativeElement.width;
    this.factorY=this.img.nativeElement.height;

     this.yet=true;
     setTimeout(()=>{
        this.factorX=this.imgWidth || this.imgHeigth?this.factorX/this.img.nativeElement.width:1
        this.factorY=this.imgWidth || this.imgHeigth?this.factorY/this.img.nativeElement.height:1
    const dim=(this.divZoomed as any).getBoundingClientRect()
    this.cx=(dim.width-this.img.nativeElement.width*this.zoom*this.factorX)/(this.img.nativeElement.width - this.lens.nativeElement.offsetWidth);
    this.cy=(dim.height-this.img.nativeElement.height*this.zoom*this.factorY)/(this.img.nativeElement.height -
     this.lens.nativeElement.offsetHeight);
         


     })


  }
  moveLens(e:any)
  {
    let pos
    let x
    let y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = this.getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (this.lens.nativeElement.offsetWidth / 2);
    y = pos.y - (this.lens.nativeElement.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    this.render.setStyle(this.divZoomed, 'display', 'block');

    if (x > this.img.nativeElement.width - this.lens.nativeElement.offsetWidth) {x = 0;         this.render.setStyle(this.divZoomed, 'display', 'none');
  }
    if (x < 0) {x = 0;         this.render.setStyle(this.divZoomed, 'display', 'none');
  }
    if (y > this.img.nativeElement.height - this.lens.nativeElement.offsetHeight) {y = 0,         this.render.setStyle(this.divZoomed, 'display', 'none');
  }
    if (y < 0) {y = 0;         this.render.setStyle(this.divZoomed, 'display', 'none');
  }
    /*set the position of the lens:*/
    this.posX = x;
    this.posY = y;
    /*display what the lens "sees":*/
    if(this.posX == 0 || this.posY == 0)
    {
        this.render.setStyle(this.divZoomed, 'display', 'none');
    }
    else{
        this.render.setStyle(this.divZoomed, 'positon', 'absolute');

    }

    let result = (x * this.cx) + "px "+(y * this.cy) + "px"

    return result;


  }
  getCursorPos(e) {
    let a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = this.img.nativeElement.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}
