$(document).ready(init);

function init()
{
  console.log('init');
  // $('.puzzle-cell').on('click',cellClicked);
  $('#swap').on('click',swapModes);
  $('#reset').on('click',resetPuzzle);
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

function resetPuzzle()
{
  $('.puzzle-cell').not('.initial').attr('data-val','0').data('val','0')
}

function tipClicked(swatch,tip)
{
  tip.target.attr('data-val',$(swatch).data('val')).data('val',$(swatch).data('val'));
  checkCompletion();
  tip.hide();
}

function checkCompletion()
{
  if (!$('.puzzle-cell[data-val="0"]').length)
  {
    $('#solve').removeClass('disabled').on('click',validateSolution);
  }
}

function validateSolution(e)
{
  console.log('valid puzzle?');
  var valid = true;
  $('.puzzle-cell').each(function()
    {
      if (!validateCell($(this)))
      {
        valid = false;
      }
    }
  );
  if (valid)
  {
    alert('You solved it!');
  }
  else
  {
    alert('Sorry, not a winner. Please try again.');
  }
}

function validateCell(cell)
{
  var matrixValues = getMatrixVals(cell);
  var rowValues = getRowVals(cell);
  var colValues = getColVals(cell);
  return (isUnique(matrixValues) && isUnique(rowValues) && isUnique(colValues));
}

function getMatrixVals(cell)
{
  var values = [];
  cell.siblings().andSelf().each(function()
    {
      values.push($(this).data('val'));
    }
  );
  return values;
}

function getRowVals(cell)
{
  var values = [];
  var rowMembers = $('.puzzle-cell[data-row="'+cell.data('row')+'"');
  rowMembers.each(function()
    {
      values.push($(this).data('val'));
    }
  );
  return values;
}

function getColVals(cell)
{
  var values = [];
  var colMembers = $('.puzzle-cell[data-col="'+cell.data('col')+'"');
  colMembers.each(function()
    {
      values.push($(this).data('val'));
    }
  );
  return values;
}

function isUnique(testArray)
{
  var map = {};
  for(var i = 0;i < testArray.length;i++)
  {
    if (!map[testArray[i]])
    {
      map[testArray[i]] = true;
    }
  }
  return (Object.keys(map).length === testArray.length);
}