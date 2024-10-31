jQuery(document).ready(function () {
  jQuery('.assetPreviewContainer').each(function () {
    const url = jQuery(this).attr('url');
    let showCustomPage = jQuery(this).attr('show-custom-page');
    let pagesToRender = jQuery(this).attr('pages');
    let customMessageTitle = jQuery(this).attr('custom-message-title');
    let customMessageContent = jQuery(this).attr('custom-message-content');
    let pdfDoc = null;
    const scale = 1.5,
      canvasContainer = jQuery(this).find('.pdf-render'),
      canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

    function renderPage(page) {
      if (page.pageIndex == 0) {
        canvasContainer.innerHTML = '';
      }
      var viewport = page.getViewport(scale);
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      canvas.height = viewport.height;
      canvas.width = viewport.width;
      canvasContainer.append(canvas);
      page.render(renderContext);
      if (page.pageIndex == pagesToRender - 1) {
        if (showCustomPage == 'true') {
          moreInfoSlide(canvasContainer);
        }
      }
    }
    function moreInfoSlide(canvasContainer) {
      var lastCanvas = document.createElement("canvas");
      lastCanvas.className = "lastcanvas";
      lastCanvas.height = 350;
      lastCanvas.width = canvasContainer.width();

      var lastCanvasCTX = lastCanvas.getContext("2d");
      lastCanvasCTX.font = "30px Arial";
      lastCanvasCTX.fillStyle = "black";
      lastCanvasCTX.textAlign = "center";
      lastCanvasCTX.fillText(customMessageTitle, lastCanvas.width / 2, lastCanvas.height / 2);
      canvasContainer.append(lastCanvas);

      lastCanvasCTX.font = "20px Arial";
      lastCanvasCTX.fillStyle = "black";
      lastCanvasCTX.textAlign = "center";
      lastCanvasCTX.fillText(customMessageContent, lastCanvas.width / 2, (lastCanvas.height / 2) + 30);
      canvasContainer.append(lastCanvas);
    }

    // Get Document
    pdfjsLib
      .getDocument(url)
      .promise.then(pdfDoc_ => {
        pdfDoc = pdfDoc_;
        jQuery(this).find('.pagesCount').html(pdfDoc.numPages);
        for (var num = 1; num <= pagesToRender; num++) {
          pdfDoc.getPage(num).then(renderPage);
        }
      })
      .catch(err => {
        // Display error
        console.log(err);
        const div = document.createElement('div');
        div.className = 'error';
        div.append(document.createTextNode(err.message));
        document.querySelector('body').insertBefore(div, canvas);
      });
  });
});