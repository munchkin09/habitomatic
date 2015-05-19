var modal_content = '';
var estados = 'animado normal bajón'.split(' ');
var desencadenantes = 'ansiedad miedo dolor ira deseo gratificacion felicidad salud'.split(' ');

var gratificaciones = 'si no'.split(' ');

$(document).ready(function()
{

});

$(document).on('click','.btn-positiva',function(e)
{
  e.preventDefault();
  $('.button btn-danger').removeClass('active');
  $(this).addClass('active');
  $('#progresion_habito').val('positiva');
});

$(document).on('click','.btn-negativa',function(e)
{
  e.preventDefault();
  $('.button btn-default').removeClass('active');
  $(this).addClass('active');
  $('#progresion_habito').val('negativa');
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

$('#modal-container').on('show.bs.modal', function (e)
{
    $(this).html(modal_content);
});


$(document).on('click','.btn-registro-habito',function(e)
{
    var btn = this;
    var data =
    {
        type : 'get',
        contentType : 'html',
        dataType : '',
        url : '/add_registro'
		};
	ajaxCall(data, function(data)
	{
    modal_content = data;
    $('#modal-container').modal('show');
	})
});

$(document).on('click','.add_registro',function(e)
{
    var btn = this;
    var data = {
		type : 'post',
		contentType : 'json',
		url : '/add_registro',
		send : { habito_id : btn.value, }
		};
	ajaxCall(data, function(data)
	{
    alert("salvado correctamente");
    $('#modal-container').modal('hide');
	})
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
				console.log(err);
			},
			complete : function(XHR, status)
			{
	     /*$('#personal ul').each('li',function(item)
				{
					if($(item).hasClass('active'))
					{
						$(item).removeClass('active');
					}
				});*/


				return true;
			},
			default : function(data, status, xhr)
			{
				next(data);
			}
	});
}
