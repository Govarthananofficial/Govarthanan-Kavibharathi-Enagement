import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { gsap } from "gsap";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.startPetalAnimation();
  }

  startPetalAnimation(){

    const scene:any = document.getElementById("flowerScene");
    if(!scene) return;

    gsap.set("#flowerScene",{perspective:600});

    const petalCount = 30;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomRange = (min:number,max:number)=>min + Math.random()*(max-min);

    for(let i=0;i<petalCount;i++){

      const petal = document.createElement("div");

      petal.className = "petal";

      gsap.set(petal,{
        x:randomRange(0,screenWidth),
        y:randomRange(-200,-150),
        z:randomRange(-200,200)
      });

      scene.appendChild(petal);

      gsap.to(petal,{
        duration:randomRange(6,15),
        y:screenHeight+100,
        ease:"none",
        repeat:-1
      });

      gsap.to(petal,{
        duration:randomRange(4,8),
        x:"+=100",
        rotationZ:randomRange(0,180),
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut"
      });

      gsap.to(petal,{
        duration:randomRange(2,8),
        rotationX:randomRange(0,360),
        rotationY:randomRange(0,360),
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut"
      });

    }
  }
}
