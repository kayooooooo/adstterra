// Função para fazer uma requisição AJAX para a API do YouTube e processar os resultados
function buscarVideosShorts(divElement, videosAdicionados) {
  var chaveApi = 'AIzaSyDi4ijvupolUUlVqJxZwsVpso69cSIpn6Q';
  var maxResultados = 1; // Número máximo de vídeos curtos a serem buscados
  var palavrasChave = ['shortscristão', 'shortsbíblia', 'shortscristao', 'shorts', 'shortssongoceans', 'shortsigreja', 'shortsjovenscristaos', 'shortsrodrigosilva', 'shortsgospel', 'shortsreflexão', 'shortsmotivação', 'shortsmotivacao', 'shortstipografiajesus', 'shortsjesus', 'shortscatolico', 'shortscristo', 'shortsfilmesgospel', 'shortsfilmescristãos', 'shortschrist', 'shortspalavra', 'shortsjesuscristo', 'shortsyeshua', 'shortsjovenscristãos', 'shortsfilmes', 'shortscenasdefilmes', 'shortseditjesus', 'shortsavivamento', 'shortslouvores', 'shortsimpactante', 'shortsempregada', 'shortsNextlevelDJAjuda', 'shortstestesocial', 'shortsjohnleitao']; // Exemplo de palavras-chave diferentes

  //var minViews = 1000; // Quantidade mínima de visualizações
  //var minLikes = 5000; // Quantidade mínima de curtidas
  
  // Escolher aleatoriamente uma palavra-chave
  var keyChaveRandon = palavrasChave[Math.floor(Math.random() * palavrasChave.length)];
  console.log('keyChaveRandon', keyChaveRandon);

  //var urlApi = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + maxResultados + '&type=video&regionCode=BR&q=' + keyChaveRandon + '&key=' + chaveApi;

  var urlApi = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + maxResultados + '&type=video&regionCode=BR&q=' + keyChaveRandon + '&key=' + chaveApi + '&order=viewCount&minViews=100000&minLikes=5000&videoDuration=short';

  
  // Fazer a requisição AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('GET', urlApi, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var resposta = JSON.parse(xhr.responseText);
        var videos = resposta.items;
        var feedHtml = '';

        // Processar os resultados da API do YouTube
        for (var i = 0; i < videos.length; i++) {
          var video = videos[i];
          var videoId = video.id.videoId;
          var titulo = video.snippet.title;
          var descricao = video.snippet.description;
          var imagem = video.snippet.thumbnails.medium.url;

          // Criar o código de incorporação do vídeo com proporção de 9:16 (vertical) e CSS responsivo
          var videoEmbed = '<div class="video-embed-container">' + '<iframe src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>' + '</div>';

          // Adicionar o HTML do vídeo
          //feedHtml += '<div class="video-item">' + videoEmbed + '</div>';

          if (videosAdicionados % 3 === 0) {
            	// Adicionar o HTML do anúncio
              feedHtml += '<div class="anuncio-item"></div>';
          } else {
            	// Adicionar o HTML do vídeo
            	feedHtml += '<div class="video-item">' + videoEmbed + '</div>';
          }

          videosAdicionados++;
        }

        // Exibir o feed de vídeos curtos na div fornecida
        divElement.innerHTML = feedHtml;

      } else {
        console.error('Erro ao buscar vídeos curtos do YouTube. Código de status: ' + xhr.status);
      }
    }
  };
  xhr.send();
}

// Chamar a função para buscar e incorporar os vídeos curtos para cada div
var meuFeedDeVideosCurtoLista = document.querySelectorAll('.meu-feed-de-videos-curto');
meuFeedDeVideosCurtoLista.forEach(function(divElement) {
  var videosAdicionados = 0; // Mover a declaração e inicialização aqui
  buscarVideosShorts(divElement, videosAdicionados);
});



// Função para fazer uma requisição AJAX para a API do YouTube e processar os resultados
/*function buscarVideosShorts() {
  var chaveApi = 'AIzaSyDi4ijvupolUUlVqJxZwsVpso69cSIpn6Q';
  var maxResultados = 1; // Número máximo de vídeos curtos a serem buscados
  var palavrasChave = ['shortscristão', 'shortsengraçados', 'shortsinformativos', 'cristão', 'songoceans']; // Exemplo de palavras-chave diferentes

  // Escolher aleatoriamente uma palavra-chave
  var keyChaveRandon = palavrasChave[Math.floor(Math.random() * palavrasChave.length)];
  console.log(keyChaveRandon);
    
  var urlApi = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + maxResultados + '&type=video&regionCode=BR&q=' + keyChaveRandon + '&key=' + chaveApi;

  
  //A principal
  //var urlApi = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + maxResultados + '&type=video&regionCode=BR&q=shortscristão&key=' + chaveApi;

  // Fazer a requisição AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('GET', urlApi, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var resposta = JSON.parse(xhr.responseText);
        var videos = resposta.items;
        var feedHtml = '';

        var videosAdicionados = 0;
        
        // Processar os resultados da API do YouTube
        for (var i = 0; i < videos.length; i++) {
          var video = videos[i];
          var videoId = video.id.videoId;
          var titulo = video.snippet.title;
          var descricao = video.snippet.description;
          var imagem = video.snippet.thumbnails.medium.url;

          // Criar o código de incorporação do vídeo
          //var videoEmbed = '<iframe width="280" height="498" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
          
          // Criar o código de incorporação do vídeo com proporção de 9:16 (vertical) e CSS responsivo
          var videoEmbed = '<div class="video-embed-container">' + '<iframe src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>' + '</div>';

          // Criar o HTML para exibir o vídeo no feed
          //var videoHtml = '<div class="video-item">' + videoEmbed + '</div>';

            if ((videosAdicionados + 1) % 3 === 0) {
            	// Adicionar o HTML do anúncio
            	//feedHtml += '<div class="anuncio-item"></div>';
              feedHtml += '<div class="anuncio-item"></div>';

          	} else {
            	// Adicionar o HTML do vídeo
            	feedHtml += '<div class="video-item">' + videoEmbed + '</div>';
            }
          videosAdicionados++;
          
          //feedHtml += videoHtml;
        }

        // Exibir o feed de vídeos curtos no Blogger
        // Exibir o feed de vídeos curtos no Blogger
        
  		//var meuFeedDeVideosCurto = document.querySelectorAll('.meu-feed-de-videos-curto');
  		//meuFeedDeVideosCurto.innerHTML = feedHtml;
        
      var meuFeedDeVideosCurtoLista = document.querySelectorAll('.meu-feed-de-videos-curto');
          meuFeedDeVideosCurtoLista.forEach(function(elemento) {
          elemento.innerHTML = feedHtml;
      });


  		// Iniciar o carrossel com os vídeos retornados pela API do YouTube
  		
        
      } else {
        console.error('Erro ao buscar vídeos curtos do YouTube. Código de status: ' + xhr.status);
      }
    }
  };
  xhr.send();
}

  // Chamar a função para buscar e incorporar os vídeos curtos ao carregar a página
  buscarVideosShorts();*/
