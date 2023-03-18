import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import asyncio

cred = credentials.Certificate("./flashesbetting-firebase-adminsdk-6scmv-9326bfb126.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

game = '0'#input('Which game? ')

winner = 'UT Martin'#input('Who won? ')
away = '9'#input('Away score? ')
home= '5'#input('Home score? ')




doc_ref = db.collection("Games").document(game)



doc = doc_ref.get()
if doc.exists:
    stuff = doc.to_dict()
    pool=0
    winnersPool = 0
    for person in stuff['bettors']:
        pool += int(stuff['bettors'][person]['betAmount'])
        if stuff['bettors'][person]['team'] == winner:
            winnersPool += int(stuff['bettors'][person]['betAmount'])

    for person in stuff['bettors']:
        if stuff['bettors'][person]['team'] == winner:
            betAmount = int(stuff['bettors'][person]['betAmount'])
            odds = betAmount / winnersPool
            amountWon = round(odds * pool, 0) 
            print(person, amountWon)
            doc_points = db.collection("users").document(person)
            doc_points.update({'points': firestore.Increment(amountWon)})
            gameProfile = 'game ' + str(game)
            #doc_points.set({'activeBets':{gameProfile: {'outcome': 'Winner'}}}, merge = True)
            #doc_points.set({'activeBets':{gameProfile: {'outcomeAmount': odds}}}, merge = True)
        else:
            print()
            #doc_points.set({'activeBets':{gameProfile: {'outcome': 'Loss'}}}, merge = True)
            #doc_points.set({'activeBets':{gameProfile: {'outcomeAmount': -betAmount}}}, merge = True)
    doc_ref.set({
    'finished': 'true',
    'winner': winner,
    'HomeScore': home,
    'awayScore': away
    }, merge = True)
            
            

         




else:
    print("No such document!")
