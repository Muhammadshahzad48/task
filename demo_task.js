froggy.ui.form.on('Demo Task', {
	refresh: function(frm) {
		frm.set_query('customer', function() {
			return {
			  filters: {
				territory: 'Pakistan' 
			  }
			};
		  });
		  frm.set_query('customer_method', function() {
			return {
				query: 'dummyapp.dummy.doctype.demo_task.demo_task.query_method',
				filters: {
					
				}
			}
		});
	
		frm.add_custom_button(__('Open Report'), function() {
			froggy.set_route('query-report','Gross Profit');
		  });
	  
		frm.add_custom_button(__('Open Popup'), function() {
		  // Create a Bootstrap modal
		  var modal = new froggy.ui.Dialog({
			title: 'Popup',
			fields: [
			  {
				fieldtype: 'Data',
				fieldname: 'popup_data',
				label: 'First Name',
				onchange: function() {
				  frm.set_value('first_name', this.value);
				}
			  },
			  {
				fieldtype: 'Date',
				fieldname: 'popup_date',
				label: 'DOB',
				onchange: function() {
				  frm.set_value('dob', this.value);
				}
			  }
			],
			primary_action: function() {
			  // Close the modal
			  modal.hide();
			}
		  });
	  
		  // Show the modal
		  modal.show();
		});
	  },
	  first_name: function(frm) {
		updateFullName(frm);
	  },
	  
	  last_name: function(frm) {
		updateFullName(frm);
	  }
});
function updateFullName(frm) {
	var firstName = frm.doc.first_name || '';
	var lastName = frm.doc.last_name || '';
	
	var fullName = '';
	
	if (firstName && lastName) {
	  fullName = firstName + ' ' + lastName;
	} else if (firstName) {
	  fullName = firstName;
	} else if (lastName) {
	  fullName = lastName;
	}
	
	frm.set_df_property('full_name', 'read_only', 1);
	frm.set_value('full_name', fullName);
  }