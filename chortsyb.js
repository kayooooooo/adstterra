// Função para fazer uma requisição AJAX para a API do YouTube e processar os resultados
function buscarVideosShorts() {
  var chaveApi = 'AIzaSyDi4ijvupolUUlVqJxZwsVpso69cSIpn6Q';
  var maxResultados = 30; // Número máximo de vídeos curtos a serem buscados
  
  //A principal
  var urlApi = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + maxResultados + '&type=video&regionCode=BR&q=shortsbrasileiros&key=' + chaveApi;

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
              feedHtml += '<div class="anuncio-item"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9071159750948981" crossorigin="anonymous"></script><ins class="adsbygoogle" style="display:inline-block;width:300px;height:600px" data-ad-client="ca-pub-9071159750948981" data-ad-slot="3416079177"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>';

          	} else {
            	// Adicionar o HTML do vídeo
            	feedHtml += '<div class="video-item">' + videoEmbed + '</div>';
            }
          videosAdicionados++;
          
          //feedHtml += videoHtml;
        }

        // Exibir o feed de vídeos curtos no Blogger
        // Exibir o feed de vídeos curtos no Blogger
  		var meuFeedDeVideosCurto = document.getElementById('meu-feed-de-videos-curto');
  		meuFeedDeVideosCurto.innerHTML = feedHtml;

  		// Iniciar o carrossel com os vídeos retornados pela API do YouTube
  		
        
      } else {
        console.error('Erro ao buscar vídeos curtos do YouTube. Código de status: ' + xhr.status);
      }
    }
  };
  xhr.send();
}

  // Chamar a função para buscar e incorporar os vídeos curtos ao carregar a página
  buscarVideosShorts();
