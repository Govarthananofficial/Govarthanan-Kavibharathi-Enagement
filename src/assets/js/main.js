function startPetalAnimation(){

  const scene = document.getElementById("flowerScene");
  if(!scene) return;

  TweenLite.set("#flowerScene",{perspective:600});

  const petalCount = 30;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const randomRange = (min,max)=>min + Math.random()*(max-min);

  for(let i=0;i<petalCount;i++){

    const petal = document.createElement("div");

    TweenLite.set(petal,{
      attr:{class:"petal"},
      x:randomRange(0,screenWidth),
      y:randomRange(-200,-150),
      z:randomRange(-200,200)
    });

    scene.appendChild(petal);

    TweenMax.to(petal,randomRange(6,15),{
      y:screenHeight+100,
      ease:Linear.easeNone,
      repeat:-1,
      delay:-15
    });

    TweenMax.to(petal,randomRange(4,8),{
      x:"+=100",
      rotationZ:randomRange(0,180),
      repeat:-1,
      yoyo:true,
      ease:Sine.easeInOut
    });

    TweenMax.to(petal,randomRange(2,8),{
      rotationX:randomRange(0,360),
      rotationY:randomRange(0,360),
      repeat:-1,
      yoyo:true,
      ease:Sine.easeInOut,
      delay:-5
    });
  }

}