package main

import (
	"database/sql"
	"github.com/labstack/echo"
	_ "github.com/mattn/go-sqlite3"
	"todo-app/backend/handlers"
)

const address = ":8000"

func main() {
	db := initDB("storage.db")

	e := echo.New()

	route(e, db)

	e.Start(address)

}


func route(e *echo.Echo, db *sql.DB )   {
	//e.File("/", "public/index.html")
	e.GET("/tasks", handlers.GetTasks(db))
	e.POST("/tasks", handlers.PostTask(db))
	e.DELETE("/tasks/:id", handlers.DeleteTask(db))
}


func initDB(filePath string) *sql.DB  {
	db, err := sql.Open("sqlite3", filePath)

	if err != nil {
		panic(err)
	}

	if  db == nil {
		panic("db interface - error")
	}

	migrate(db)

	return db
}

func migrate(db *sql.DB)  {
	sql := `
    CREATE TABLE IF NOT EXISTS tasks(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name VARCHAR NOT NULL
    );
    `

	_, err := db.Exec(sql)
	// Exit if something goes wrong with our SQL statement above
	if err != nil {
		panic(err)
	}
}
