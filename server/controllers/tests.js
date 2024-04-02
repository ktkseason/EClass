import Test from "../models/Test.js";

/* Create */
export const createTest = async (req, res) => {
    try {
        const {
            question,
            rightAnswer,
            wrongAnswer1,
            wrongAnswer2,
            wrongAnswer3,
        } = req.body;

        const answers = [
            {
                answer: rightAnswer,
                right: true,
            },
            {
                answer: wrongAnswer1,
                right: false,
            },
            {
                answer: wrongAnswer2,
                right: false,
            },
            {
                answer: wrongAnswer3,
                right: false,
            }
        ];

        const newTest = new Test({
            question,
            answers
        });

        await newTest.save();
        const tests = await Test.find();
        res.status(201).json(tests);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Read */
export const readTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json(tests);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const readTest = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test.findById(id);

        res.status(200).json(test);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const readTestRandom = async (req, res) => {
    try {
        const tests = await Test.aggregate([
            {
                $addFields: {
                    tmpOrder: { '$rand': {} },
                },
            },
            {
                $sort: {
                    tmpOrder: 1,
                },
            },
        ]).limit(5);
        res.status(200).json(tests);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* Update */
export const updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            question,
            rightAnswer,
            wrongAnswer1,
            wrongAnswer2,
            wrongAnswer3,
        } = req.body;

        const answers = [
            {
                answer: rightAnswer,
                right: true,
            },
            {
                answer: wrongAnswer1,
                right: false,
            },
            {
                answer: wrongAnswer2,
                right: false,
            },
            {
                answer: wrongAnswer3,
                right: false,
            }
        ];

        const updatedTest = await Test.findByIdAndUpdate(
            id,
            {
                question,
                answers
            }
        );

        res.status(200).json(updatedTest);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}

/* Delete */
export const deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        await Test.findByIdAndDelete(id);
        const tests = await Test.find();
        res.status(200).json(tests);
    } catch (err) {
        res.status(409).json({ error: err.message });
    }
}
