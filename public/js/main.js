var modal_content = '';
var estados = 'animado normal bajón'.split(' ');
var desencadenantes = 'ansiedad miedo dolor ira deseo gratificacion felicidad salud'.split(' ');
var bBlock = false;
var gratificaciones = 'si no'.split(' ');

$(document).ready(function()
{
  $('.slider').slider({
    formatter: function(value) {
      return 'Intensidad: ' + value;
    }
  });
});



$(document).on('click','.btn-positiva',function(e)
{
  e.preventDefault();
  $(this).addClass('active');
  $('#progresion_habito').val('positiva');
});

$(document).on('click','.btn-negativa',function(e)
{
  e.preventDefault();
  $(this).addClass('active');
  $('#progresion_habito').val('negativa');
});


$(document).on('click','.btn-registro-positiva',function(e)
{
  e.preventDefault();
});
$(document).on('click','.btn-registro-negativa',function(e)
{
  e.preventDefault();
});
$(document).on('click','.btn-registro-neutra',function(e)
{
  e.preventDefault();
});

$('#modal-container').on('show.bs.modal', function (e)
{
    $(this).html(modal_content);
});

$(document).on('hide.bs.dropdown',function(e, data)
{
  if(bBlock == true)
  {
    e.preventDefault();
  }
});

$(document).on('show.bs.dropdown',function(e, data)
{
  bBlock = true;
});

$(document).on('click','.btnAddHabit',function(e)
{
  var data =
  {
			contentType : 'html',
			dataType : '',
			url : '/add_habit',
			type : 'get'
	};
	ajaxCall(data, function(data)
	{
    modal_content = data;
    $('#modal-container').modal('show');
	})
});

$(document).on('click','#btnAddHabit',function(e)
{
  var data =
  {
      type : 'post',
      contentType : 'json',
      url : '/add_habit',
      send : $("#frmHabito").serialize()
  };
	ajaxCall(data, function(data)
	{
    alert("salvado correctamente");
    $('#modal-container').modal('hide');
	})
});

$(document).on('click','.btn-registro-habito',function(e)
{
  bBlock = false;
  var id = this.value;
  var data =
  {
      type : 'post',
      contentType : 'json',
      url : '/add_registro_por_habito',
      send : { habito_id : id, estado : 'animado', gratificacion : 'si', desencadenante : 'dolor', intensidad : 4 }
  };
	ajaxCall(data, function(data)
	{

      $('#' + id + '_dd').dropdown('hide');
	});
});

  function ajaxCall(data, next)
{
	$.ajax({
			async : true,
			cache : false,
			dataType : data.dataType,
			contenType : data.contentType,
			type: data.type,
			crossDomain : false,
			url : data.url,
			data : data.send,
			beforeSend : function(XHR, settings)
			{

			},
			error : function(XHR, status, err)
			{
			},
			complete : function(XHR, status)
      {
        next(XHR.responseText);
				return true;
			},
			default : function(data, status, xhr)
			{
          //console.log(data);
          //next(data);
			}
	});
}
