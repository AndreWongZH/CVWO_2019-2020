# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

todos = [
    {:title => "Get cake", :created => "Dec 26 2019", :deadline => "Jan 10 2020", :desc => "Get a cake for a friend", :done => false, :tag => "food,cake"},
    {:title => "study math", :created => "Dec 27 2019", :deadline => "Feb 20 2020", :desc => "Study calculus and partial differential", :done => true, :tag => "math,study"},
    {:title => "vacumm floor", :created => "Dec 27 2019", :deadline => "Dec 28 2019", :desc => "Vacumm all places", :done => false, :tag => "tidy,important"},
    {:title => "visit sentosa", :created => "Dec 27 2019", :deadline => "Jan 11 2020", :desc => "call jake and ask for a camera", :done => false, :tag => "contact,outing"},
    {:title => "go skating", :created => "Dec 28 2019", :deadline => "Jan 12 2020", :desc => "borrow skating shoes from a friend", :done => false, :tag => "outing"},
    {:title => "buy groceries", :created => "Dec 28 2019", :deadline => "Jan 13 2020", :desc => "get eggs, milk, bread and butter", :done => false, :tag => "important,food"},
    {:title => "contact interested partners", :created => "Dec 29 2019", :deadline => "Jan 14 2020", :desc => "call tim if he is interested in the proposal", :done => false, :tag => "contact,work"},
    {:title => "read up on programming", :created => "Jan 1 2020", :deadline => "Jan 23 2020", :desc => "study on java and learn some object oriented programming", :done => false, :tag => "programming"}
]

todos.each do |todo|
    Todo.create!(todo)
end