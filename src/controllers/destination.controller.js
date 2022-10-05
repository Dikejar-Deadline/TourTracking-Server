const { Destination } = require("../models");

class DestinationController {
  static async getDestinations(req, res, next) {
    try {
      const destinations = await Destination.findAll();
      res.status(200).json(destinations);
    } catch (error) {
      next(error);
    }
  }

  static async createDestination(req, res, next) {
    try {
      let { name, description, imgUrl } = req.body;

      let input = { name, description, imgUrl };
      const destination = await Destination.create(input);
      res.status(201).json(destination);
    } catch (error) {
      next(error);
    }
  }

  static async getDestinationById(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw { name: "RequiredDestinationId" };
      const destination = await Destination.findByPk(id);
      res.status(200).json(destination);
    } catch (error) {
      next(error);
    }
  }

  static async editDestination(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw { name: "RequiredDestinationId" };

      const destination = await Destination.findOne({ where: { id: id } });
      if (!destination) throw { name: "MissingDestination" };

      let { name, description, imgUrl } = req.body;
      let input = { name, description, imgUrl };
      destination.update(input);
      res.status(200).json({ message: `success update destination with id ${id}` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteDestination(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw { name: "RequiredDestinationId" };

      const destination = await Destination.findOne({ where: { id: id } });
      if (!destination) throw { name: "MissingDestination" };

      destination.destroy();
      res.status(200).json(destination);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DestinationController;
