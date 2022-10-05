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
      const { name, description, imgUrl } = req.body;
      const destination = await Destination.create({
        name,
        description,
        imgUrl,
      });
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

      const { name, description, imgUrl } = req.body;
      destination.update({ name, description, imgUrl });
      res.status(200).json({ name, description, imgUrl });
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
      res.status(200).json(true);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DestinationController;
