


engine.script = {};




engine.script.call = [

   function()
   {
   	  engine.output(' ');    
   	  engine.output('__script-1 loaded');   
      engine.setMap(maptwo);
      engine.viewport.x = -2;
      engine.viewport.y = 1;
      engine.player.spriteIndex = 6;

      engine.draw();
   },

   function()
   {
   	  engine.output(' ');    
   	  engine.output('__script-2 loaded');   
      engine.setMap(mapone);
      engine.viewport.x = -2;
      engine.viewport.y = 5;
      engine.player.spriteIndex = 6;

      engine.draw();
   },

   function()
   {
   	  engine.output(' ');   
   	  engine.output('__script-3 loaded');   
      engine.output('fountain activated');
      alert("Enjoy The Limited Edition Item \n \n ~~ The Fountain ~~");
   }

];