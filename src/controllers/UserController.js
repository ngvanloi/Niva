const UserService = require("../services/UserService");
const signUp = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is required",
      });
    }

    if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is email",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: "The password is equal to confirmPassword",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is email",
      });
    }
    const response = await UserService.signIn({ email, password });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "The Id was not defined",
      });
    }

    if (!data) {
      return res.status(400).json({
        status: "ERR",
        message: "The data was not defined",
      });
    }
    const response = await UserService.updateUser(id, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const response = await UserService.getAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getDetailsUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "This User does not exists",
      });
    }
    const response = await UserService.getDetailsUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "ERR",
        message: "The UserId is required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const deleteManyUsers = async (req, res, next) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(400).json({
        status: "ERR",
        message: "The IDs is not defined",
      });
    }

    const response = await UserService.deleteManyUsers(ids);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

module.exports = { signUp, signIn, updateUser, getAllUsers, getDetailsUser, deleteUser, deleteManyUsers };
