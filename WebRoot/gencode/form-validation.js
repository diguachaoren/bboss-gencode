var FormValidation = function () {

    

	var inittableconfig = function() {
		// for more info visit the official plugin documentation: 
		// http://docs.jquery.com/Plugins/Validation

		var form2 = $('#configform');

		var error1 = $('.alert-danger', form2);
		var success1 = $('.alert-success', form2);
		form2
				.validate({
					errorElement : 'span', //default input error message container
					errorClass : 'help-block help-block-error', // default input error message class
					focusInvalid : false, // do not focus the last invalid input
					ignore : "", // validate all fields including form hidden input
					messages : {
						select_multi : {
							maxlength : jQuery.validator
									.format("Max {0} items allowed for selection"),
							minlength : jQuery.validator
									.format("At least {0} items must be selected")
						}
					},
					rules : {
						moduleName : {
							minlength : 1,
							required : true
						},

						moduleCNName : {
							minlength : 1,
							required : true
						},

						packagePath : {
							minlength : 1,
							required : true
						},

						sourcedir : {
							minlength : 1,
							required : true
						},

						author : {
							minlength : 1,
							required : true
						},

						company : {
							minlength : 1,
							required : true
						},

						version : {
							minlength : 1,
							required : true
						}
					},

					invalidHandler : function(event,
							validator) { //display error alert on form submit              
						success1.hide();
						error1.show();
						Metronic.scrollTo(error1, -200);
					},

					highlight : function(element) { // hightlight error inputs
						$(element).closest('.form-group')
								.addClass('has-error'); // set error class to the control group
					},

					unhighlight : function(element) { // revert the change done by hightlight
						$(element).closest('.form-group')
								.removeClass('has-error'); // set error class to the control group
					},

					success : function(label) {
						label.closest('.form-group')
								.removeClass('has-error'); // set success class to the control group
					},

					submitHandler : function(form) {
						//success1.show();
						error1.hide();
						$(form)
								.ajaxSubmit(
										{
											type : 'POST',
											url : 'gencode.page',
											forceSync : false,
											dataType : 'json',
											beforeSubmit : function() {
												Metronic
														.startPageLoading();
											},
											error : function(
													xhr,
													ajaxOptions,
													thrownError) {
												Metronic
														.stopPageLoading();
											},

											success : function(
													responseText,
													statusText,
													xhr,
													$form) {
												Metronic
														.stopPageLoading();

												var msg = responseText.result;
												var title = '生成代码';
												
												if (msg == 'success') {
													title = '代码生成成功！';
													$("#gencodeid").val(responseText.gencodeid);
													$("#readme").click(function (e) {
															TableAdvanced.readme(responseText.gencodeid,e);
														});
													$("#readme").show();
													$("#downcode").attr("href","downcode.page?genid="+responseText.gencodeid)
													$("#downcode").show();
												} else
													title = responseText.result;
												toastr.options = {
													"closeButton" : true,
													"debug" : false,
													"positionClass" : "toast-top-center",
													"onclick" : null,
													"showDuration" : "0",
													"hideDuration" : "0",
													"timeOut" : "10000",
													"extendedTimeOut" : "0",
													"showEasing" : "swing",
													"hideEasing" : "linear",
													"showMethod" : "fadeIn",
													"hideMethod" : "fadeOut"
												};

												toastr['success']
														(
																msg,
																title); // Wire up an event handler to a button in the toast, if it exists

											}

										});
					}
				});
		

		$("#controlParams").select2(
				{
					tags : [ "geni18n", "clearSourcedir",
							"genRPC", "autopk", "genwf",
							"print" ]
				});
		$(".editcontrolParams").select2({
			tags : [ "显示", "隐藏", "编辑", "必填", "只读", "忽略" ]
		});
		$(".addcontrolParams").select2({
			tags : [ "显示", "隐藏", "编辑", "必填", "只读", "忽略" ]
		});
		$(".viewcontrolParams").select2({
			tags : [ "显示", "隐藏", "忽略" ]
		});
		$(".inlist").select2({
			tags : [ "显示", "隐藏", "忽略" ]
		});
	}
	
	var initselecttableform = function() {
		// for more info visit the official plugin documentation: 
		// http://docs.jquery.com/Plugins/Validation

		var form2 = $('#tableform');

		var error1 = $('.alert-danger', form2);
		var success1 = $('.alert-success', form2);
		var validator = form2
				.validate({
					errorElement : 'span', //default input error message container
					errorClass : 'help-block help-block-error', // default input error message class
					focusInvalid : false, // do not focus the last invalid input
					ignore : "", // validate all fields including form hidden input
					messages : {
						select_multi : {
							maxlength : jQuery.validator
									.format("Max {0} items allowed for selection"),
							minlength : jQuery.validator
									.format("At least {0} items must be selected")
						}
					},
					rules : {
						dbname : {
							minlength : 1,
							required : true
						},

						tableName : {
							minlength : 1,
							required : true
						} 
					},

					invalidHandler : function(event,
							validator) { //display error alert on form submit              
						success1.hide();
						error1.show();
						Metronic.scrollTo(error1, -200);
					},

					highlight : function(element) { // hightlight error inputs
						$(element).closest('.form-group')
								.addClass('has-error'); // set error class to the control group
					},

					unhighlight : function(element) { // revert the change done by hightlight
						$(element).closest('.form-group')
								.removeClass('has-error'); // set error class to the control group
						if(validator.numberOfInvalids() == 0)
						{
							error1.hide();
						}
					},

					success : function(label) {
						label.closest('.form-group')
								.removeClass('has-error'); // set success class to the control group
						if(validator.numberOfInvalids() == 0)
						{
							error1.hide();
						}
					},

					submitHandler : function(form) {
						//success1.show();
						error1.hide();
						FormValidation.totableconfig('tableconfig',event)
					}
				});
		
 
	}
	
	var initdsform = function() {
		// for more info visit the official plugin documentation: 
		// http://docs.jquery.com/Plugins/Validation

		var form2 = $('#dsform');

		var error1 = $('.alert-danger', form2);
		var success1 = $('.alert-success', form2);
		var validator = form2
				.validate({
					errorElement : 'span', //default input error message container
					errorClass : 'help-block help-block-error', // default input error message class
					focusInvalid : true, // do not focus the last invalid input
					ignore : "", // validate all fields including form hidden input
					messages : {
						select_multi : {
							maxlength : jQuery.validator
									.format("Max {0} items allowed for selection"),
							minlength : jQuery.validator
									.format("At least {0} items must be selected")
						}
					},
					rules : {
						dsdbname : {
							minlength : 1,
							required : true
						},

						dsdburl : {
							minlength : 1,
							required : true
						} 
						,

						dsdbdriver : {
							minlength : 1,
							required : true
						} 
					},

					invalidHandler : function(event,
							validator) { //display error alert on form submit              
						success1.hide();
						error1.show();
						//Metronic.scrollTo(error1, -200);
					},

					highlight : function(element) { // hightlight error inputs
						$(element).closest('td')
								.addClass('has-error'); // set error class to the control group
					},

					unhighlight : function(element) { // revert the change done by hightlight
						$(element).closest('td')
								.removeClass('has-error'); // set error class to the control group
						if(validator.numberOfInvalids() == 0)
						{
							error1.hide();
						}
					},

					success : function(label) {
						label.closest('td')
								.removeClass('has-error'); // set success class to the control group
						if(validator.numberOfInvalids() == 0)
						{
							error1.hide();
						}
					},

					submitHandler : function(form) {
						//success1.show();
						error1.hide();
						//FormValidation.totableconfig('tableconfig',event)
					}
				});
		
 
	}
	
	var tempsave = function () {
		$("#configform").ajaxSubmit({
			type : 'POST',
			url : 'tempsave.page',
			forceSync : false,
			dataType : 'json',
			beforeSubmit : function() {
				Metronic.startPageLoading();
			},
			error : function(xhr, ajaxOptions, thrownError) {
				Metronic.stopPageLoading();
			},

			success : function(responseText, statusText, xhr, $form) {
				Metronic.stopPageLoading();

				var msg = responseText.result;
				var title = '生成代码';
				if (msg == 'success') {
					title = '临时保存配置文件成功！';
					$("#gencodeid").val(responseText.gencodeid);
				} else
					title = responseText.result;

				toastr.options = {
					"closeButton" : true,
					"debug" : false,
					"positionClass" : "toast-top-center",
					"onclick" : null,
					"showDuration" : "0",
					"hideDuration" : "0",
					"timeOut" : "10000",
					"extendedTimeOut" : "0",
					"showEasing" : "swing",
					"hideEasing" : "linear",
					"showMethod" : "fadeIn",
					"hideMethod" : "fadeOut"
				};

				toastr['success'](msg, title); // Wire up an event handler to a button in the toast, if it exists

			}

		});
	}
   
	var totableconfig = function (ahref,event)
	{
		//$('#'+ahref).val("href","tableconfig.page?dbname="+$('#dbname').val()+"&tableName="+$('#tableName').val());
		event.preventDefault();
		$('#'+ahref).click()
		
	}

	var  refreshdb = function(targetE,event)
	{
		//$('#'+ahref).val("href","tableconfig.page?dbname="+$('#dbname').val()+"&tableName="+$('#tableName').val());
		//event.preventDefault();
		var dbname = $('#dbname').val();
		 Metronic.startPageLoading();
		$.ajax({
	        type: "POST",
	        cache: false,
	        url: "refreshtables.page",
	        data:{dbname:dbname},
	        dataType: "json",
	        success: function (tables) {
	        	 Metronic.stopPageLoading();
	        	 var hcontent = "";
	        	 for(var table in tables)
	        	{
	        		 hcontent = hcontent+"<option value='"+tables[table]+"'>"+tables[table]+"</option>";
	        	}
	            $("#"+targetE).html(hcontent);
	            toastr['success']("refresh tablemeta successed", "提示"); // Wire up an event handler to a button in the toast, if it exists
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	        	 alert(thrownError);
	        	Metronic.stopPageLoading();
	        },
	        async: false
	    });
		
	}
    return {
        //main function to initiate the module
    	inittableconfig: function () {           
    		inittableconfig();
        },
    
    	initselecttableform: function () {           
    		initselecttableform();
    	},
    
    	initdsform: function () {           
    		initdsform();
    	}
    	,tempsave:function()
    	{
    		tempsave();
    	}
    	,totableconfig:function(ahref,event)
    	{
    		totableconfig(ahref,event);
    	},refreshdb:function(targetE,event)
    	{
    		refreshdb(targetE,event);
    	}

    };

}();