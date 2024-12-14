import mongoose from "mongoose";
import config from "../config";
import Profile from "../modules/profile/profile.model";
import { USER_ROLES } from "../modules/user/user.constant";
import { IUser } from "../modules/user/user.interface";
import User from "../modules/user/user.model";

const superUser: IUser = {
  email: config.SUPER_ADMIN_EMAIL!,
  password: config.SUPER_ADMIN_PASSWORD!,
  role: USER_ROLES.SUPER_ADMIN,
  status: "active",
  needsPasswordChange: false,
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isSuperAdminExits = await User.findOne({
      role: USER_ROLES.SUPER_ADMIN,
    }).session(session);

    if (!isSuperAdminExits) {
      // Create super user
      const user = await User.create([superUser], { session });

      // Create admin related data
      await Profile.create(
        [
          {
            user: user[0]._id,
            name: "Super Admin",
            email: superUser.email,
            gender: "male",
            phone: "+8801706592962",
            address: "XYZ Street, 123",
            dateOfBirth: "2003-03-15",
            avatar:
              "https://glrealestatecoop.com/wp-content/uploads/2022/06/profile-avatar-340x340.png",
          },
        ],
        { session },
      );

      // Commit transaction
      await session.commitTransaction();

      // eslint-disable-next-line no-console
      console.log("Super admin user seeded successfully");
    } else {
      // eslint-disable-next-line no-console
      console.log("Super admin already exists");
    }
  } catch (error) {
    // If an error occurs, rollback the transaction
    await session.abortTransaction();

    // eslint-disable-next-line no-console
    console.error("Error seeding super admin:", error);
  } finally {
    // End session
    session.endSession();
  }
};

export default seedSuperAdmin;
