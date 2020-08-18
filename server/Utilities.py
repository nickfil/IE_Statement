
class Utilities:
    def organizeFormFromRawFormInput(input):
        #getting a json file and trying to make sense of it
        info={}
        income = {}
        expenses = {}
        debt = {}
        di = 0
        ie=0
        ieRating = ''
        for key in input:
            if(key=="name" or key=="email" or key=="phone" or key=="dob" or key=="address"):
                if(input[key] is not ''): info[key]=input[key]
            elif(key=="salary" or key=="other"):
                if(input[key]is not ''): income[key]=int(input[key])
                else: income[key]=0
                if(input[key]is not ''): di+=int(input[key])
            elif(key=="loans" or key=="creditCards"):
                if(input[key]is not ''): debt[key]=int(input[key])
                else: debt[key]=0
                if(input[key]is not ''): di-=int(input[key])
            elif(key=="mortgage" or key=="rent" or key=="utilities" or key=="travel" or key=="food"):
                if(input[key]is not ''): expenses[key]=int(input[key])
                else: expenses[key]=0
                if(input[key]is not ''): di-=int(input[key])
        
        
        if(sum(income.values()) is not 0):
            ie=sum(expenses.values()) /sum(income.values())

        if(ie<0.1):
            ieRating='A'
        elif(ie>=0.1 and ie<0.3):
            ieRating='B'
        elif(ie>=0.3 and ie<0.5):
            ieRating='C'
        else:
            ieRating='D'

        data={}
        data['income'] = income
        data['expenses'] = expenses
        data['debt'] = debt
        data['di'] = di
        data['ieRating'] = ieRating
        return info, data