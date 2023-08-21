import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


//GET 
export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("author")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

//Patch
export const PATCH = async (req, { Params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(Params.id);


        if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;


        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (err) {
        return new Response("Failed to Update prompt", { status: 500 })
    }
}


//Delete
export const DELETE = async (req, { Params }) => {


    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(Params.id);

        return new Response("Prompt deleted", { status: 200 });
    } catch (err) {
        return new Response("Failed to Delete prompt", { status: 500 })
    }
}