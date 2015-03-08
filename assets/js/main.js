$(document).ready(init);

function init()
{
  console.log('init');
  $('.puzzle-cell').on('click',cellClicked);
  $('#swap').on('click',swapModes);
  $('#solve').on('click',validateSolution);
  $('.puzzle-cell').not('.initial').each(function(){
    $(this).qtip(
      {
        content:
        {
          text: $('.tip-wrapper').clone()
        },
        show: 
        {
          event: 'click'
        },
        hide:
        {
          delay: 300,
          fixed: true
        },
        position:
        {
          my: 'center center',
          at: 'center center'
        },
        events:
        {
          render: function(event,api)
          {
            var api = this.qtip('api');
            this.find('.tip-cell').on('click',function(){tipClicked(this,api);});
          }
        }
      }
    );
  });
}

function cellClicked(e)
{
  console.log($(e.currentTarget).data());
}

function swapModes(e)
{
  if ($(e.currentTarget).data('mode') == 'numbers')
  {
    $(e.currentTarget).data('mode','colors').find('.swap-text').text('numbers');
    $('html').removeClass('numbers').addClass('colors');
  }
  else
  {
    $(e.currentTarget).data('mode','numbers').find('.swap-text').text('colors');
    $('html').removeClass('colors').addClass('numbers');
  }
}

function tipClicked(swatch,tip)
{
  console.log(tip);
  tip.target.attr('data-val',$(swatch).data('val'));
  tip.hide();
}

function validateSolution(e)
{
  console.log('validate');
}