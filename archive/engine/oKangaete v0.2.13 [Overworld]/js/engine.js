var engine = {};

engine.outhnd = document.getElementById('output');
engine.canvas = document.getElementById('canvas');
engine.handle = engine.canvas.getContext('2d');

engine.output = function(message)
  
  {
    engine.outhnd.innerHTML +='<br />' + message;
  };
    
    engine.draw = function(mapData)
    
      {
        if(engine.tile.allLoaded() === false)
        
          {
            setTimeout(engine.draw, 100);
          }
          
        else
          
          {
            engine.map.draw();
            engine.player.draw();
          }
      };



    //engine.handle.translate( 0, 8 );  
  
    engine.start = function(mapData, x, y)
    
      {
        engine.output('starting application...');
        
        engine.viewport.x = x;
        engine.viewport.y = y;
        
        engine.tile.store(0, 'images/tile_black2.png');
        engine.tile.store(1, 'images/tile_ground2.png');
        engine.tile.store(2, 'images/tile_pillar2.png');
        
        engine.player.store(0,  'images/dir_n0.png');
        engine.player.store(1,  'images/dir_n0.png');
		engine.player.store(2,  'images/dir_n0.png');

		engine.player.store(3,  'images/dir_e0.png');
		engine.player.store(4,  'images/dir_e1.png');
		engine.player.store(5,  'images/dir_e2.png');

		engine.player.store(6,  'images/dir_s0.png');
		engine.player.store(7,  'images/dir_s0.png');
		engine.player.store(8,  'images/dir_s0.png');

		engine.player.store(9,  'images/dir_w0.png');
		engine.player.store(10, 'images/dir_w1.png');
		engine.player.store(11, 'images/dir_w2.png');

		engine.tile.store(3, 'images/stair_down_2_alt2.png');
		engine.tile.store(4, 'images/stair_down_22.png');
		engine.tile.store(5, 'images/tile_ground2.png');
		engine.tile.store(6, 'images/fountain_1lted2.png');

        engine.output('__tilesets loaded.'); 		

        engine.setMap(mapData);
        
        engine.output('__map loaded.');        
        
        engine.draw();
        engine.keyboard.canInput = true;
        
        engine.output('__map drawn sucessfully.');
        engine.output('application loaded.');
      };
      
      engine.currentMap = null;
      
      engine.setMap = function(mapData)
      
        {
          engine.currentMap = mapData;
        };
