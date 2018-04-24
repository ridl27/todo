$(document).ready(function () {

		// Today 
		Data = new Date();
		Year = Data.getFullYear();
		Month = Data.getMonth();
		Day = Data.getDate();
		switch (Month){
			case 0: fMonth="января"; break;
			case 1: fMonth="февраля"; break;
			case 2: fMonth="марта"; break;
			case 3: fMonth="апреля"; break;
			case 4: fMonth="мае"; break;
			case 5: fMonth="июня"; break;
			case 6: fMonth="июля"; break;
			case 7: fMonth="августа"; break;
			case 8: fMonth="сентября"; break;
			case 9: fMonth="октября"; break;
			case 10: fMonth="ноября"; break;
			case 11: fMonth="декабря"; break;
		}
		today=Day+" "+fMonth+" "+Year+" г.";
		$('#Today').text(today);

 
		// Проверить память 
		mem=localStorage.getItem('all');
		$('#listOfTasks').append(mem);	
		toggleEmptyList();


	// 1. Отправка формы
	$('#form-new-task').on('submit', function(e){
		e.preventDefault();
		// 2. Принимать текст из поля с новым заданием
		var taskText = $('#addNewTask').val();
		// 3. Генерировать новую задачу - подставить текст в разметку, и вывести его на экран
		var $taskHolder = $('<li class="list-group-item d-flex justify-content-between task-item">');
		var $taskTitle = $('<span class="task-title">').text(taskText);
		var $taskButtons = $('<div class="task-item__buttons"><button type="button" data-action="task-done" class="btn btn-light align-self-end gray"><i class="fas fa-check"></i></button><button type="button" data-action="task-delete" class="btn btn-light align-self-end gray"><i class="fas fa-times"></i></button></div>');
		$taskHolder.append($taskTitle).append($taskButtons);
		$('#listOfTasks').append($taskHolder);
		showNotify('new');		
		toggleEmptyList();
		State();
		$('#addNewTask').val('');
	});

	// 4. Отрабатывать клик по кнопке удалить, удалять текущую задачу
	$('#listOfTasks').on('click', '[data-action="task-delete"]', function(e){
		e.preventDefault();
		$(this).parents('.task-item').remove();
		showNotify('delete');		
		toggleEmptyList();
		State();
	});

	// 5. Отмечать выполненные задачи
	$('#listOfTasks').on('click', '[data-action="task-done"]', function(e){
		e.preventDefault();
		$(this).parents('.task-item').find('.task-title').toggleClass('task-title--done');
		showNotify('done');
		State();
	});

	// 6. Показывать нотификации при добавлении / удалении 
	function showNotify(type) {
		var $notifyNew = $('<div class="alert alert-warning" role="alert">Задача добавлена!</div>'),
			$notifyDone = $('<div class="alert alert-success" role="alert">Задача выполнена!</div>'),
			$notifyDelete = $('<div class="alert alert-danger" role="alert">Задача удалена!</div>');
			$notifyError = $('<div class="alert alert-danger" role="alert">Ошибка! Нет такого действия!</div>');

		switch (type){
			case 'new':
				$notifyBlock = $notifyNew;
				break;
			case 'done':
				$notifyBlock = $notifyDone;
				break;
			case 'delete':
				$notifyBlock = $notifyDelete;
				break;
			default:
				$notifyBlock = $notifyError;
				break;
		}

		$('#notifyHolder .alert').fadeOut();
		$notifyBlock.hide();
		$('#notifyHolder').append($notifyBlock);
		$notifyBlock.fadeIn();
		setTimeout(function(){
			$notifyBlock.fadeOut();
			setTimeout(function(){
				$notifyBlock.remove();
			}, 1500);
		}, 1200);
	}

	// 7. Показывать спец блок - что список дел пуст - когда задач нет
	function toggleEmptyList() {
		if ( $('#listOfTasks').children().length > 0 ) {
			$('#emptyList').hide();
			$('#Tasks').show();
		} else {
			$('#emptyList').show();
			$('#Tasks').hide();
		}
	}
	

	// История 
		function State(){
			AllTasks=$('#listOfTasks').html();
			localStorage.setItem('all', AllTasks);
			// localStorage.clear(); - шоби почистить. можна в консоль					
		}

});