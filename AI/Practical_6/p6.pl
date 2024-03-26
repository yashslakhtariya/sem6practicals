recommend_material :-
    ask_subject(Subject),
    ask_level(Level),
    ask_type(Type),
    suggest_material(Subject, Level, Type, Material),
    nl, write('Based on your preferences, we recommend: '), nl,
    write(Material), nl.

ask_subject(Subject) :-
    write('What AI-related subject would you like to learn about? '), nl,
    write('1. Predicate Logic'), nl,
    write('2. Prepositional Logic'), nl,
    write('3. Intelligent Agent'), nl,
    write('4. Informed Search'), nl,
    write('5. Uninformed Search'), nl,
    nl,
    read(Option),
    subject_option(Option, Subject),
    nl.

subject_option(1, 'Predicate Logic').
subject_option(2, 'Prepositional Logic').
subject_option(3, 'Intelligent Agent').
subject_option(4, 'Informed Search').
subject_option(5, 'Uninformed Search').

ask_level(Level) :-
    write('What is your proficiency level (1 for beginner, 2 for intermediate, 3 for advanced)? '),
    read(Level),nl.

ask_type(Type) :-
    write('Do you prefer reading, or watching? '),
    read(Type),nl.

suggest_material(Subject, Level, Type, Material) :-
    material(Subject, Material, Level, Type).

material('Predicate Logic', 'https://drive.google.com/file/d/1X-dEOinigBWf0CDhtB4VqMY8bGke1d4E/view', 1, 'reading').
material('Predicate Logic', 'https://www.youtube.com/watch?v=FpGeg27Ffk8', 1, 'watching').

material('Prepositional Logic', 'https://drive.google.com/file/d/1X-dEOinigBWf0CDhtB4VqMY8bGke1d4E/view', 1, 'reading').
material('Prepositional Logic', 'https://www.youtube.com/watch?v=6490tKrGEic', 1, 'watching').

material('Intelligent Agent', 'https://drive.google.com/file/d/1c89-gv1cY9Os5K6m2TvKq95_J6igLl1b/view', 1, 'reading').
material('Intelligent Agent', 'https://www.youtube.com/watch?v=BkedAnQfJ_U', 1, 'watching').

material('Informed Search', 'https://www.youtube.com/watch?v=gZpUcsB9TFc', 1, 'watching').
material('Informed Search', 'https://drive.google.com/file/d/1lF8hEuBhWLsNZwffBeAO9pYorJiAqUQ1/view', 1, 'reading').

material('Uninformed Search', 'https://drive.google.com/file/d/1Ju8Ffdo7ubLi4syHEq4vXKe4t2Xvd8K2/view', 1, 'reading').
material('Uninformed Search', 'https://www.youtube.com/watch?v=gZpUcsB9TFc', 1, 'watching').

study :-
    nl,
    write('Welcome to the Reading Material Recommendation System!'), nl,
    recommend_material,
    nl, write('Would you like to save the recommended materials of all subjects to a file? (yes/no) '),
    read(Choice),
    (Choice = 'yes' -> 
        tell('ysl-material.txt'),
        forall(material(Subject, Source, Level, Type), (
            write('Subject: '), write(Subject), nl,
            write('Material Source: '), write(Source), nl,
            write('Level: '), write(Level), nl,
            write('Type: '), write(Type), nl,
            nl
        )),
        told;
        true
    ),
    nl,
    (Choice = 'no' -> write('The recommended materials are not saved to a file.'); true),
    nl,
    write('Thank you for using the system!'), nl.
