father_of(joe,paul).
father_of(joe,mary).
father_of(joe,hope).
mother_of(jane,paul).
mother_of(jane,mary).
mother_of(jane,hope).
male(paul).
male(joe).
male(ralph).
female(mary).
female(jane).
female(hope).
son_of(X,Y) :- father_of(Y,X),male(X).
son_of(X,Y) :- mother_of(Y,X),male(X).
sibling_of(X,Y) :- !,father_of(Z,X),father_of(Z,Y),X\=Y.
sibling_of(X,Y) :- !,mother_of(Z,X),mother_of(Z,Y),X\=Y.
male(X) :- father_of(X,_).
female(X) :- mother_of(X,_).
daughter_of(X,Y) :- female(X),mother_of(Y,X) ; father_of(Y,X).
brother_of(X,Y) :- male(X),sibling_of(Y,X).
sister_of(X,Y) :- female(X),sibling_of(Y,X).