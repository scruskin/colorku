$(document).ready(init);

function init()
{
  console.log('init');
  $('.puzzle-cell').on('click',cellClicked);
}

function cellClicked(e)
{
  console.log($(e.target).data());
}