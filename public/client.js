$(function(){
	var asset;
	var name;
	var school;
	var code;
	
	var list = [];
	
	var box = '<input type="text" class= "ltoName" value="">';
	var but = '<button type ="button" class="addLTO">LTO</button>';
	
	var del = '<button type="button" class="removeLTO">Remove</button>';
	var editDiv = "<div class='edit'><strong>&nbsp&nbspEdit</strong></div>"
	
	
	

	
	var inputLTO;
	
	
	$.get('/laptops', {}, function(data){
		//console.log("Get request sent");
		console.log("Response.. ");
		for(var i = 0; i < data.length; i++){
			list.push({
				id: data[i].id,
				asset: data[i].asset,
				name: data[i].name,
				lto: data[i].lto,
				school: data[i].school,
				compName: data[i].compName,
				hasLTO: false
			});
			
			var placeholder;
			if(list[i].lto == null){
				placeholder = "";
				list[i].hasLTO = false;
				inputLTO= "<div class='inputLTO'>" +  box + but +  "</div>";

			}
			else{
				placeholder = "<div class = 'ltoName'><strong>" + list[i].lto + "</strong></div>";
				list[i].hasLTO = true;
				inputLTO = "<div class ='inputLTO'>" + del + "</div>";
			}
			
			
			var info =
				"<td>" + list[i].name + placeholder + inputLTO + "</td>"+ 
				"<td>" + list[i].asset + "</td>" +
				"<td>" + list[i].school + "</td>" + 
				"<td>" + list[i].compName + "</td>" + 
				"<td>" + editDiv + "</td>";
				
			
			
			line = "<tr id = '" + list[i].id +  "'>" + info + "</tr>";
			
		//	console.log(line);

			$('#display').append(line);
			$('#' + list[i].id).children().first().find('.inputLTO').hide();

			
			if(list[i].hasLTO == true){
				$('#' + list[i].id + "").addClass('withLTO');
				
			}
		}	
	});
	
	
	
	$(document).on('click', '.edit', function(){
		var id = $(this).parent().parent().attr('id');
		console.log(id + " Length: " + list.length);
		var $toggleBox;
		
		
		for(var i = 1; i <= list.length; i++){
			$toggleBox =  $('#' + i).children().first().find('.inputLTO');
			if(i != id){
				$($toggleBox).hide();
			}
			else{
				$($toggleBox).toggle();
			}
		} 
	
	
	});
	
	
	$(document).on('click', '.removeLTO', function(){
		console.log("Delete clicked");
		var $id = $(this).parent().parent().parent().attr('id');
	
	
	
		$.ajax({
			method: 'DELETE',
			data: {id: $id},
			url: '/laptops/' + $id,
			success: function(result){
				console.log(result);
				location.reload(true);
			}
		});
	
	
	
	});
	
	


	
	//enter lto 
	$(document).on('click', '.addLTO', function(){
		var input = $(this).prev().val();
		
		//this grabs the id of the specific dom element
		var $id = $(this).parent().parent().parent().attr('id');
		console.log($id);
		
		
		
		$.ajax({
			method: 'PUT',
			data: {i: input},
			url: '/laptops/' + $id,
			success: function(result){
				console.log("Refreshing");
				location.reload(true);

			}
		});
		
	});
	
	
	
	
	
	$('#run').click(function(){
		$('#target').submit();
	});
	
	
	$('#target').submit(function(event){
		asset = $('#asset').val();
		name = $('#name').val();
		school = $('#inSchool').val();
		code = $('#inCode').val();
		
	
	
	
		$('#asset').val('');
		$('#name').val('');
		$('#inSchool').val('');
		$('#inCode').val('');
		
		
		//alert("The input is " + asset + " " + name);
		event.preventDefault();
		
	
		
		$.post('/laptops', {a: asset, n: name, s: school, c: code}, function(data){
			console.log("Post request sent");
		});
		
		location.reload(true);
		
	});
	
	
});
	
			
			