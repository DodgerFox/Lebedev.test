'use strict'

$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    if ($this.hasClass('color')){
      $this.after('<div class="select-styled"><span style="background-color:'+ $this.children('option').eq(0).text() +' ";></span></div>');
    }else{
      $this.after('<div class="select-styled"><p></p></div>');
    }

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.find('p').text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    if ($this.hasClass('color')){
      for (var i = 0; i < numberOfOptions; i++) {
        var content = '<span style="background-color:'+ $this.children('option').eq(i).text()+';"></span>';
          $('<li />', {
              html: content,
              rel: $this.children('option').eq(i).val()
          }).appendTo($list);
      }
    }else{
      for (var i = 0; i < numberOfOptions; i++) {
          $('<li />', {
              text: $this.children('option').eq(i).text(),
              rel: $this.children('option').eq(i).val()
          }).appendTo($list);
      }
    }


    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        if ($this.hasClass('color')){
          $styledSelect.html($(this).html()).removeClass('active');
        }else{
          $styledSelect.text($(this).text()).removeClass('active');
        }
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});
