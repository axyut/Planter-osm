const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
	{
		plantName: {
			type: String,
			required: [true, "Plant Name is required"],
			tirm: true,
			minlength: 2,
			maxlength: 20,
		},
		plantType: {
			type: String,
			required: [true, "Plant Type is required"],
			tirm: true,
			minlength: 2,
			maxlength: 20,
			enum: {
				values: ["Tree", "Flower", "Shurbs", "Herbs"],
				message: "{VALUE} is not Supported",
			},
		},
		plantedBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide Contributer!"],
		},
		belongsTo: [
			{
				type: mongoose.Types.ObjectId,
				ref: "User",
				required: [true, "Please provide Contributer!"],
				default: function () {
					if (this.plantedBy) {
						return this.plantedBy;
					} else {
						return this.plantedBy;
					}
				},
			},
		],
		status: {
			type: String,
			required: [true, "Health Status is required"],
			default: "GREAT",
			enum: {
				values: ["POOR", "OKAY", "NORMAL", "GREAT"],
				message: "{VALUE} is not Supported",
			},
		},
		nickName: {
			type: String,
			required: [true, "Nick Name is required"],
			tirm: true,
			minlength: 2,
			maxlength: 20,
		},
		location: {
			type: [Number], // Array of numbers: [latitude, longitude]
			required: [true, "Location is required!"],
			trim: true,
			//unique: true
		},
	},
	{ timestamps: true }
);

//MIDDLEWARE
// plantSchema.pre("save", async function (next) {
// 	if (!this.belongsTo) {
// 		this.belongsTo[0] = this.plantedBy;
// 	}

// 	next();
// });

const Plant = mongoose.model("PLANT", plantSchema);

module.exports = Plant;

// location: [37.7749, -122.4194]
// const yourDocument = await YourModel.findOne({
// 	/* your query */
// });
// const latitude = yourDocument.location[0];
// const longitude = yourDocument.location[1];
