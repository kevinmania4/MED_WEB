import csv
import json
import re
import math
import numpy as np
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
# /---
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn import datasets
from sklearn import svm
import pandas as pd
import numpy as np
# Importando metricas para evaluacion
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score


def funcion_curacion(palabras):
    tokens = [re.sub(r'[-()\"#/@;:´<>¿{}`+=~|.!?,’‘0-9,A¡“”…¡¡¡»]', ' ', i.lower()).split() for i in palabras]
    stopW = stopwords.words('spanish')
    for h in tokens:
        for m in h:
            if m in stopW:
                h.remove(m)
        for m in h:
            if m in stopW:
                h.remove(m)
        for m in h:
            if m in stopW:
                h.remove(m)

    spanishStemmer = SnowballStemmer("spanish", ignore_stopwords=True)
    stemmer2 = [[spanishStemmer.stem(m) for m in h] for h in tokens]
    # print("\nSteamming:")
    # for i in stemmer2:
    #      print(i)
    return stemmer2


def funcionVocabulario(tweets):
    vocabularioTweet = []
    for tweet in tweets:
        for palabraTweet in tweet:
            if palabraTweet not in vocabularioTweet:
                vocabularioTweet.append(palabraTweet)
    return vocabularioTweet

def funcionVocabulario2(tweets):
    vocabularioTweet = []
    for palabraTweet in tweets:
        if palabraTweet not in vocabularioTweet:
            vocabularioTweet.append(palabraTweet)
    return vocabularioTweet


def pesado(n):
    if n > 0:
        return round(1 + math.log10(n), 2)
    else:
        return 0


def cacluloIDF(n, df):
    return round(math.log10(n / df), 3)


def funcion_TF_IDF(documentosV):
    vocabulario = funcionVocabulario(documentosV)
    # print('VOCA',len(vocabulario))
    N = len(documentosV)
    cuenta = []
    WTF = []
    idf = []
    dfl = []
    tf_idf = []
    for k in range(len(vocabulario)):
        pal = vocabulario[k]
        conteo = [tok.count(pal) for tok in documentosV]
        peso = [pesado(tok.count(pal)) for tok in documentosV]
        cuenta.append(conteo)
        WTF.append(peso)
        df = 0
        for i in peso:
            if i != 0:
                df += 1
        dfl.append(df)
        idf.append(cacluloIDF(N, df))
        opera_idf_tf = [e * cacluloIDF(N, df) for e in peso]
        tf_idf.append(opera_idf_tf)
    # print('{:<20} {:<20} {:<25} {:<8} {:<15} {}'.format('Palabra', 'Matriz TF', 'Matriz WTF', 'DF', 'IDF', 'Matriz TF-IDF'))
    # print('')
    # for pos in range(len(vocabulario)):
    #     print('{:<15} {} {} {} {} {:<7} {:<5} {} {:<10} {} {}'.format(vocabulario[pos], ':',cuenta[pos], '', WTF[pos], '', dfl[pos], '', idf[pos], '', tf_idf[pos]))
    return tf_idf


# ----------------------------------------------------------------------------------------------------------------------------------
with open('Modelo05JSON') as json_data:
    content = json_data.read()
    data = json.loads(content)

sintomas = []
enfermedades = []
for entry in data:
    sintomas.append(entry['sintomas'])
    enfermedades.append(entry['enfermedad'])

# -----------------------------------------------------------------
y = enfermedades
valorx = funcion_TF_IDF(sintomas)
arr1 = np.array(valorx)
x = arr1.transpose()
vocca = funcionVocabulario2(y)
vocca.sort()

# Modelo de Máquinas de Vectores de Soporte
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.4, random_state=12)  #
algoritmo = SVC(kernel='sigmoid')
algoritmo.fit(X_train, y_train)
Y_pred = algoritmo.predict(X_test)

# print('Precisión Máquinas de Vectores de Soporte: {}'.format(algoritmo.score(X_train, y_train)))
##MATRIZ

# print(classification_report(y_test,Y_pred))
# print("MATRIZ DE CONFUSION")
matrix_aux = confusion_matrix(y_test, Y_pred)
# print(matrix_aux)

##Precision
# print('accurancy is ', accuracy_score(Y_pred,y_test))
m = np.array(matrix_aux)
b = np.asarray(m)
# print('Diagonal (sum): ', np.trace(b))

array = m
salida = np.sum(array, axis=1)
# print(f" SUMA FILAS = {salida}")

sum1 = m.sum(axis=0)
# print(f" SUMA COLUMNAS = {sum1}")

import numpy as np

FP = m.sum(axis=0) - np.diag(m)
FN = m.sum(axis=1) - np.diag(m)
TP = np.diag(m)
TN = m.sum() - (FP + FN + TP)

FP = FP.astype(float)
FN = FN.astype(float)
TP = TP.astype(float)
TN = TN.astype(float)

# Precision or positive predictive value
PPV = TP / (TP + FP)
# print("Precision \n", PPV)
i = 1
# for elemento in PPV:
#     print(f"PPV(C{i})  = {elemento}")
#     i = i + 1

# Sensitivity, hit rate, recall, or true positive rate
TPR = TP / (TP + FN)
# print("TP Rate (TPR)  o Sensibilidad o RECALL \n", TPR)
i = 1
# for elemento in TPR:
#     print(f"TPR(C{i})  = {elemento}")
#     i = i + 1

# F-Measure

F1 = 2 * (PPV * TPR) / (PPV + TPR)
# print(" F-Measure\n", F1)
i = 1
# for elemento in F1:
#     print(f"F(C{i})  = {elemento}")
#     i = i + 1

# Overall accuracy
ACCC = np.trace(b) / sum(sum1)
############################################3

totalErrores = sum(sum1) - np.trace(b)
# /-------------------////////////////////*****************************************
# print('Son {} datos para entrenamiento y {} datos para prueba'.format(X_train.shape[0], X_test.shape[0]))
pres = algoritmo.score(X_test, y_test)
# print('Precisión Máquinas de Vectores de Soporte: {}'.format(pres))
# acu=accuracy_score(Y_pred,y_test)
# print('accurancy is ',acu )
# print("ACCURACY\n", ACCC)

# print("Precision \n", PPV)
# print("TP Rate (TPR)  o Sensibilidad o RECALL \n", TPR)
# print(" F-Measure\n", F1)
# print('Total de rrores:', totalErrores)

# for i in range(len(Y_pred)):
#     print(Y_pred[i]," Real: ",y_test[i])

DATA = {
    "test":X_test.shape[0] ,
    "training":X_train.shape[0],
    "pSVC": pres,
    "enfermedadades":vocca,
    "T_erroes": int(totalErrores),
    "accuracy": ACCC,
    "precision": list(PPV),
    "recall": list(TPR),
    "f_mesure": list(F1),
    "prediccion": list(Y_pred),
    "reales": y_test
}

#print(DATA)
print(json.dumps(DATA))
