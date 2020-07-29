use charity
db.createCollection("NGO_Summary")
db.NGO_Summary.createIndex({"NGO_UID": 1 }, { unique: true })
db.NGO_Summary.createIndex({"NGO_ID": 1 }, { unique: true })

db.NGO_Summary.insert({'NGO_Name':'name1', "regdate" :new Date('2020-01-20'), 'NGO_UID':'uid1', 'NGO_Address':'address1' , 'State':'state1' , 'NGO_ID':'id1' , 'Type':'type1'})



db.createCollection("Account_Summary")
db.Account_Summary.createIndex({"Acc_number": 1 }, { unique: true })
db.Account_Summary.createIndex({"Acc_ID": 1 }, { unique: true })
db.Account_Summary.insert({'Acc_number':'accno','Acc_ID':'accid', 'Bank_name':'Name', "Pull Date" :new Date('2020-01-20'), 'Read_access':'False'})


db.createCollection("NGO_Accounts")
db.NGO_Accounts.createIndex( { NGO_ID: 1, Acc_ID: 1}, { unique: true } )
db.NGO_Accounts.insert({'NGO_ID':'ngono','Acc_ID':'accid'})

db.createCollection("Account_Details")
db.Account_Details.createIndex({"Acc_ID": 1 }, { unique: true })
db.Account_Details.insert({'Acc_ID':'accid', 'Transaction_list':'list', 'Weekly_Transaction_ID':'ID', 'Total_credit':'credit', 'Total_debit':'debit'})

db.createCollection("NGO_Details")
db.NGO_Details.createIndex( { NGO_ID: 1}, { unique: true } )
db.NGO_Details.insert({'NGO_ID':'ngono','Weekly_update_status':'status', 'Notification_send':'Flag', 'Weekly_update_percent':'Weekly percent','Monthly_update_percent':'Monthly percent','Privacy':'Public/private'})

db.createCollection("Visitor_Details")
db.Visitor_Details.createIndex( { Visitor_code: 1}, { unique: true } )
db.Visitor_Details.createIndex( { Visitor_ID: 1}, { unique: true } )
db.Visitor_Details.insert({'Name':'name', 'Visitor_code':'code', 'Visitor_ID':'ID', 'Visitor_Address':'Address','Accessible_NGO_list':'list'})

db.createCollection("Transaction_Details")
db.Transaction_Details.createIndex( { Transaction_ID: 1}, { unique: true } )
db.Transaction_Details.insert({'Transaction_ID':'id','Bank_Name':'name', 'Transaction_Type':'debit/credit', 'Transaction_Mode':'Online/UPi/cash', 'Transaction_Amount':'2000','Transaction_Reason':'for cash','proof':'proof','Remark':'Remarks'})