package services

import (
	"database/sql"
	"github.com/labstack/echo"
	"log"
	"net/http"
	"strconv"
	"todo-app/backend/models"
)

type H map[string]interface{}

// Get Tasks endpoint
func GetTasks(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Fetch tasks using our new model
		return c.JSON(http.StatusOK, models.GetTasks(db))
	}
}

func GetTask(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, _ := strconv.Atoi(c.Param("id"))
		return c.JSON(http.StatusOK, models.GetTask(db, id))
	}
}

// Put Task endpoint
func PostTask(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Instantiate a new task
		var task models.Task
		// Map incoming JSON body to the new Task

		c.Bind(&task)

		if task.Status == "" {
			task.Status = "active"
		}

		log.Println("====INSERT====")
		log.Println(task)
		log.Println("====INSERT====")

		// Add a task using our new model
		id, err := models.PostTask(db, task.Title, task.Description, task.Tags, task.Status, task.Date)
		// Return a JSON response if successful
		if err == nil {
			return c.JSON(http.StatusCreated, H{
				"created": id,
			})
			// Handle any errors
		} else {
			return err
		}
	}
}

func PutTask(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Instantiate a new task
		var task models.Task
		// Map incoming JSON body to the new Task

		c.Bind(&task)

		if task.Status == "" {
			task.Status = "active"
		}

		log.Println("====UPDATE====")
		log.Println(task)
		log.Println("====UPDATE====")

		// Add a task using our new model
		id, err := models.PutTask(db, task.Tags, task.Description, task.Status, task.Date)
		// Return a JSON response if successful
		log.Println(id)
		if err == nil {
			return c.JSON(http.StatusNoContent, H{})
			// Handle any errors
		} else {
			return err
		}
	}
}

// Delete Task endpoint
func DeleteTask(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, _ := strconv.Atoi(c.Param("id"))
		// Use our new model to delete a task
		_, err := models.DeleteTask(db, id)
		// Return a JSON response on success
		if err == nil {
			return c.JSON(http.StatusOK, H{
				"deleted": id,
			})
			// Handle errors
		} else {
			return err
		}
	}
}
