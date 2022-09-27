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
      const destination = await Destination.findByPk(id);
      res.status(200).json(destination);
    } catch (error) {
      next(error);
    }
  }

  static async editDestination(req, res, next) {
    try {
      const id = +req.params.id;
      let { name, description, imgUrl } = req.body;
      let input = { name, description, imgUrl };
      const destination = await Destination.put(input, {
        where: {
          id: id,
        },
      });
      res.status(200).json(destination);
    } catch (error) {
      next(error);
    }
  }

  static async deleteDestination(req, res, next) {
    try {
      const id = +req.params.id;
      const destination = await Destination.destroy({ where: { id: id } });
      res.status(200).json(destination);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DestinationController;
