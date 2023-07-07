
import froggy
from froggy.model.document import Document

class DemoTask(Document):
	pass

# @froggy.whitelist()
# def query_method(doctype, txt, searchfield, start, page_len, filters):
# 	    return froggy.db.sql('''SELECT name FROM `tabCustomer` WHERE territory= 'Rest Of The World' ''')
   


@froggy.whitelist()
def query_method(doctype, txt, searchfield, start, page_len, filters):
    query = froggy.db.sql("""SELECT customer_name FROM `tabCustomer` WHERE customer_name LIKE %(txt)s """, {'txt': f'%{txt}%'},as_dict=False)
    return query

@froggy.whitelist()
def customer(customer_name):
    customer_doc = froggy.get_doc('Customer', customer_name)
    territory = customer_doc.territory

    return territory