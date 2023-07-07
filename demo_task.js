froggy.ui.form.on('Demo Task', {
	before_submit: function(frm) {
		// froggy.msgprint('Before Submit hook triggered');
		console.log('Before Submit hook triggered');
	},
	before_cancel: function(frm) {
		// froggy.throw('Before cancel hook triggered');
		console.log('Before Cancel hook triggered');
	},
	
	before_save: function(frm) {
        // frappe.msgprint('Before Save hook triggered');
		console.log('Before Save hook triggered.')
    },

	validate: function(frm) {
		if (!frm.doc.first_name) {
		  froggy.msgprint('Please fill in the First Name field.');
		  froggy.validated = false;
		}
	  },
	customer: function(frm) {
		var customer = frm.doc.customer;
		if (customer) {
		console.log('response')
		  froggy.call({
			method: 'dummyapp.dummy.doctype.demo_task.demo_task.customer',
			args: {
				customer_name: customer
			},
			callback: function(response) {
			  if (response.message) {
				var territory = response.message;
				frm.set_value('territory', territory);
			  }
			}
		  });
		}
		else {
			frm.set_value('territory', '');
		  }
	  },
	  after_save: function(frm) {
        // frappe.msgprint('After Save hook triggered');
		console.log('After Save hook triggered.')
    },
	

	onload: function(frm){
		frm.toggle_display('email', false);
	},

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
					territory: 'Rest Of The World'
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
		   if (frm.doc.first_name) {
            frm.toggle_reqd('dob', true);
			frm.toggle_display('email', true);
        } else {
            frm.toggle_reqd('dob', false);
			frm.toggle_display('email', false);
        }
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