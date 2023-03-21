import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./flashesbetting-firebase-adminsdk-6scmv-9326bfb126.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
#erase static values to use inputs
game = '6'#input('Which game? ')
winner = "Kent State"#input('Who won? ')
away = '2'#input('Away score? ')
home= '5'#input('Home score? ')

#get firebase game doc
doc_ref = db.collection("Games").document(game)
doc = doc_ref.get()
#end firebase game doc

# Create the point pools -> Maybe use .has instead of loops?
if doc.exists:
    stuff = doc.to_dict()
    pool=0
    winnersPool = 0
    for person in stuff['bettors']:
        pool += int(stuff['bettors'][person]['betAmount'])
        if stuff['bettors'][person]['team'] == winner:
            winnersPool += int(stuff['bettors'][person]['betAmount'])
    #end of pools

    #odds calculator
    for person in stuff['bettors']:
        doc_games = doc_points = db.collection("Games").document(game)
        doc_points = db.collection("users").document(person)
        gameProfile = 'game ' + str(game)
        betAmount = int(stuff['bettors'][person]['betAmount'])
        if stuff['bettors'][person]['team'] == winner:
            odds = betAmount / winnersPool
            amountWon = round(odds * pool, 0) 
            doc_games.set({'bettors':{person: {'outcome': 'Winner'}}}, merge = True)
            doc_games.set({'bettors':{person: {'amountWon': odds}}}, merge = True)
            #calculate points based on pools
            print(person, amountWon)
            doc_points.update({'points': firestore.Increment(amountWon)})
            # Increment points won and add win to database
            doc_points.set({'activeBets':{gameProfile: {'outcome': 'Winner'}}}, merge = True)
            doc_points.set({'activeBets':{gameProfile: {'outcomeAmount': odds}}}, merge = True)
        else:
            print(person, -betAmount)
            doc_points.set({'activeBets':{gameProfile: {'outcome': 'Loser'}}}, merge = True)
            doc_points.set({'activeBets':{gameProfile: {'outcomeAmount': -betAmount}}}, merge = True)
            doc_games.set({'bettors':{person: {'outcome': 'Loser'}}}, merge = True)
            doc_games.set({'bettors':{person: {'amountWon': -betAmount}}}, merge = True)
    doc_ref.set({
    'finished': 'true',
    'winner': winner,
    'HomeScore': home,
    'awayScore': away
    }, merge = True)
        #set game doc information
else:
    print("No such document!")
