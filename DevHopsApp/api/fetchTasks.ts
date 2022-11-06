import type { Task } from '../types'

export const fetchTasks = async (): Promise<Task[]> => {
    return [
        {
            "id" : 6542565,
            "title" : "do some breps",
            "username" : "nanana",
            "status" : "todo",
            "comments" : ["first comment", "second comment"],
            "images" : ["\\Dropbox\\devhops\\images\\rhino.PNG"]
        },
        {
            "id" : 6542561,
            "title": "do some work",
            "username" : "memmee",
            "status" : "inprogress",
            "comments" : ["in progress comment", "second in progress comment"],
            "images" : ["\\Dropbox\\devhops\\images\\rhino.PNG"]
        },
        {
            "id" : 6542562,
            "title": "do more work",
            "username" : "superuser guy",
            "status" : "done",
            "comments" : ["awesome", "great work"],
            "images" : ["\\Dropbox\\devhops\\images\\rhino.PNG"]
        }
    ]
}