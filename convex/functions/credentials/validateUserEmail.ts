import { query } from "../../_generated/server";
import { v } from "convex/values";

export const validateUserEmail = query({
    args:{
        email: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("userCredentials")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();
        
        return user !== null;
    }
})