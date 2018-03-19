var engine = {};

engine.outhnd = document.getElementById('output');
engine.canvas = document.getElementById('canvas');
engine.handle = engine.canvas.getContext('2d');

engine.output = function(message)
  
  {
    engine.outhnd.innerHTML +='<br />' + message;
  };

engine.screen = {};

engine.screen.width  = engine.canvas.width;
engine.screen.height = engine.canvas.height;

engine.screen.tilesX = engine.canvas.width  / 16;
engine.screen.tilesY = engine.canvas.height / 16;

engine.viewport = {};

engine.viewport.x = 0;
engine.viewport.y = 0;

engine.map = {};

engine.map.draw = function()

  {
    var i, j;
    
    var mapX = 0;
    var mapY = 0;
    var tile;
    
    engine.output('drawing map from ' + engine.viewport.x + ',' + engine.viewport.y + 'to' + 
    				(engine.viewport.x + engine.screen.tilesX) + ',' +
    			    (engine.viewport.y + engine.screen.tilesY));
    
    for (j=0; j<engine.screen.tilesY; j++)
    
      {
        for(i=0; i<engine.screen.tilesX; i++)
        
          {
            mapX = i + engine.viewport.x;
            mapY = j + engine.viewport.y;
            
            tile = (engine.currentMap[mapY] && engine.currentMap[mapY][mapX]) ? engine.currentMap[mapY][mapX] : {ground: 0};
              
            engine.tile.draw(i, j, tile);
          }
      }
   };
  
    engine.tile = {};

    engine.tile.draw = function(x, y, tile)
    
      {
        engine.handle.drawImage(engine.tile.retrieve(tile.ground), x * 16, y * 16);

        if(tile.item)
        
          {
            engine.handle.drawImage(engine.tile.retrieve(tile.item), x * 16, y * 16);
          }
      }

    
    engine.tile.images = [];
    
    engine.tile.store = function(id, imgSrc)
     
      {
        var newid = engine.tile.images.length;
        var tile  = [id, new Image(), false];
        
        tile[1].src     = imgSrc;
        tile[1].onload = function()
          
          {
            tile[2] = true;
          }
          
          engine.tile.images[newid] = tile;
      };
      
    engine.tile.retrieve = function(id)
    
      {
        var i, len = engine.tile.images.length;
        
        for(i=0; i<len; i++)
        
          {
            if(engine.tile.images[i][0] == id)
            
              {
                return engine.tile.images[i][1];
              }
          }
      };
    
      
    engine.tile.allLoaded = function()
    
      {
        var i, len = engine.tile.images.length;
        
        for(i=0; i<len; i++)
        
          {
            if(engine.tile.images[i][2] === false)
            
              {
                return false;
              }
          }
	  
          return true;
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
        engine.output('starting');
        
        engine.viewport.x = x;
        engine.viewport.y = y;
        
        engine.tile.store(0, 'images/tile_black.png');
        engine.tile.store(1, 'images/tile_ground.png');
        engine.tile.store(2, 'images/tile_pillar.png');
        
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

        engine.setMap(mapData);
        engine.draw();
        
        engine.output('done');
      };
      
      engine.currentMap = null;
      
      engine.setMap = function(mapData)
      
        {
          engine.currentMap = mapData;
        };
