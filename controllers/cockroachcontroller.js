/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */

import { Cockroach } from "../models/Cockroach.js";

const cockroachcontroller = {
  index: async (req, res) => {
    try {
        const data = await Cockroach.findAll();

        res.render("cockroach", {
            cockroaches: data.map(item =>
                item.toJSON()
            ),
            totalRecords: data.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to load cockroach records.");
    }
},

  
  insert: async (req, res) => {
    try {
      const data = await Cockroach.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  
  get: async (req, res) => {
    try {
      const data = await Cockroach.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Cockroach.findByPk(id);

      if (!data) {
        return res.status(404).json({
          message: "Cockroach record not found"
        });
      }

      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const [updated] = await Cockroach.update(
        req.body,
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).json({
          message: "Cockroach record not found"
        });
      }

      const data = await Cockroach.findByPk(id);
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Cockroach.destroy({
        where: { id }
      });

      if (!data) {
        return res.status(404).json({
          message: "Cockroach record not found"
        });
      }

      res.json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
  // SHOW ADD FORM
  addPage: async (req, res) => {
    res.render("cockroach-add");
  },

  // SAVE NEW COCKROACH
  addFromView: async (req, res) => {
    try {
      const {
        FirstName,
        LastName,
        age,
        gender,
        type,
        hp,
        address
      } = req.body;

      await Cockroach.create({
        FirstName,
        LastName,
        age,
        gender,
        type,
        hp,
        address
      });

      res.redirect("/cockroach-table");
    } catch (error) {
      console.error(error);
      res.status(400).send("Failed to add Cockroach record.");
    }
  },
  addPage: async (req, res) => {
  res.render("cockroach-add");
},
  // SHOW TABLE VIEW
  table: async (req, res) => {
    try {
      const data = await Cockroach.findAll();

      res.render("cockroach", {
        cockroaches: data.map(item => item.toJSON()),
        totalRecords: data.length
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to load records.");
    }
  },

  // SHOW EDIT FORM
  editPage: async (req, res) => {
    try {
      const cockroach = await Cockroach.findByPk(req.params.id);

      if (!cockroach) {
        return res.status(404).send("Record not found.");
      }

      res.render("cockroach-edit", {
        cockroach: cockroach.toJSON()
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to load edit form.");
    }
  },

  // SAVE EDIT AND DELETE FROM VIEW
  updateFromView: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Cockroach.update(
        req.body,
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).send("Record not found.");
      }

      res.redirect("/cockroach-table");
    } catch (error) {
      console.error(error);
      res.status(400).send("Failed to update record.");
    }
  },

  deleteFromView: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Cockroach.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).send("Record not found.");
      }

      res.redirect("/cockroach-table");
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to delete record.");
    }
  },
  
};


export { cockroachcontroller };
