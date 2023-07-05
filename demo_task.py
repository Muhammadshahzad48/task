
import froggy
from froggy.model.document import Document

class DemoTask(Document):
	pass

@froggy.whitelist()
def query_method(doctype, txt, searchfield, start, page_len, filters):
	    return froggy.db.sql('''SELECT name FROM `tabCustomer` WHERE territory= 'Rest Of The World' ''')
   