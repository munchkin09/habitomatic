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

$(document).on("slide", ".slider", function(slideEvt)
{
  slideEvt.target.nextElementSibling.value = slideEvt.value;
});


$(document).on('click','.btn-perspectiva-positiva',function(e)
{
  e.preventDefault();
  $(this).addClass('active');
  $('.btn-negativa').removeClass('active');
  $('#progresion_habito').val(this.value);
});

$(document).on('click','.btn-perspectiva-negativa',function(e)
{
  e.preventDefault();
  $(this).addClass('active');
  $('.btn-positiva').removeClass('active');
  $('#progresion_habito').val(this.value);
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

$(document).on('click','.btn-default-positiva',function(e)
{
  e.preventDefault();
  $('.btn-default-negativa').removeClass('active');
  $('.btn-default-neutra').removeClass('active');
  $(this).addClass('active');
  $('#default_estado').val(this.value);
});

$(document).on('click','.btn-default-negativa',function(e)
{
  e.preventDefault();
  $('.btn-default-positiva').removeClass('active');
  $('.btn-default-neutra').removeClass('active');
  $(this).addClass('active');
  $('#default_estado').val(this.value);
});
$(document).on('click','.btn-default-neutra',function(e)
{
  e.preventDefault();
  $('.btn-default-negativa').removeClass('active');
  $('.btn-default-positiva').removeClass('active');
  $(this).addClass('active');
  $('#default_estado').val(this.value);
});

$(document).on('click','.btn-si',function(e)
{
  e.preventDefault();
  $('btn-no').removeClass('active');
  $(this).addClass('active');
  $("#default_gratificacion").val(this.value);
})

$(document).on('click','.btn-no',function(e)
{
  e.preventDefault();
  $('btn-si').removeClass('active');
  $(this).addClass('active');
  $("#default_gratificacion").val(this.value);
});

$('#modal-container').on('show.bs.modal', function (e)
{
    $(this).html(modal_content);
});

$(document).on('hide.bs.dropdown',function(e)
{
  if(bBlock == true)
  {
    e.preventDefault();
  }
});

$(document).on('show.bs.dropdown',function(e)
{
  bBlock = true;
  var jq = $(this).parent();
  console.dir(jq.val());
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
	});
});

$(document).on('click','#btnAddHabit',function(e)
{
  e.preventDefault();
  var data =
  {
      type : 'post',
      contentType : 'json',
      url : '/add_habit',
      send : $("#frmHabito").serialize()
  };
	ajaxCall(data, function(data)
	{
    //alert("salvado correctamente");
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
      send : { habito_id : id, estado : $('#' + id + '_estado').val(), gratificacion : $('#' + id + '_gratificacion').val(), desencadenante : $('#' + id + '_desencadenante').val(), intensidad : $('#' + id + '_intensidad').val() }
  };
  //alert($('#' + id + '_estado').val())
  //alert(JSON.stringify(data));
	ajaxCall(data, function(data)
	{
      $('#' + id + '_dd').dropdown('hide');
	});
});

$(document).on('click','.btn-stats-habito',function(e)
{
  e.preventDefault();
  bBlock = false;
  var id = this.value;
  var data =
  {
      type : 'get',
      contentType : 'html',
      url : '/stats_habito/' + id
  };
	ajaxCall(data, function(data)
	{
    $("#chart-container").html(data);
	});
})




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
