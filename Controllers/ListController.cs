using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using To_Do_List.Models;

namespace To_Do_List.Controllers
{
    public class ListController : Controller
    {

        private EntidadeBase dbList = new EntidadeBase();


        public ActionResult Index()
        {
            // Ordenar tarefas pelo ID em ordem decrescente
            var items = dbList.TodosItems.OrderByDescending(item => item.Id).ToList();
            return View(items);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Base todoItem)
        {
            if (ModelState.IsValid)
            {
                dbList.TodosItems.Add(todoItem);
                dbList.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(todoItem);
        }
        public ActionResult Edit(int id)
        {
            var item = dbList.TodosItems.Find(id);
            if (item == null)
            {
                return HttpNotFound();
            }
            return View(item);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Base baseItem)
        {
            if (ModelState.IsValid)
            {
                dbList.Entry(baseItem).State = System.Data.Entity.EntityState.Modified;
                dbList.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(baseItem);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            try
            {
                var item = dbList.TodosItems.Find(id);
                if (item != null)
                {
                    dbList.TodosItems.Remove(item);
                    dbList.SaveChanges();
                    return Json(new { success = true });
                }
                return Json(new { success = false, message = "Item não encontrado." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult DeletarTodos()
        {
            try
            {
                var TodosItems = dbList.TodosItems.ToList();
                dbList.TodosItems.RemoveRange(TodosItems);
                dbList.SaveChanges();
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }

}
