import Image from "next/image";
import { PostView } from "lemmy-js-client";
import Link from "next/link";

import Username from "./User/Username";
import Vote from "./Vote";
import RenderMarkdown from "./ui/RenderMarkdown";

import { FormatDate } from "@/utils/formatDate";
import { AutoMediaType, isImageType } from "@/utils/AutoMediaType";

import styles from "../styles/post.module.css"
import markdownStyle from "@/styles/util/markdown.module.css";

export default function Post({ post, onClick=() => null } : { post: PostView, onClick?: () => void }) {
    if(!post) throw new Error("Post is undefined");

    const hasMedia = post.post.embed_video_url || post.post.thumbnail_url;

    const baseUrl = new URL(post.community.actor_id).hostname;
    // https://lemmy.ml/post/1681855
    //
    //const postUrl = `https://${baseUrl}/post/${post.post.id}`;

    const postUrl = `/post/${post.post.id}?preload=true`;

    return (
        <>
        <div 
            className={`${styles.wrapper}`} key={post.post.id} 
            id={`${post.post.id.toString()}@${baseUrl}`}
            style={{ height: !hasMedia ? "fit-content" : "unset", cursor: hasMedia ? "unset" : "pointer" }}
        >
            <div className="max-md:hidden"><Vote post={post} /></div>

            <div className={`${styles.rightSide}`}>

                <div className={`${styles.header}`} >
                    <div className={`${styles.headerContent}`}>
                        <div className={`${styles.headerMetadata}`}>
                            <Link href={`/c/${post?.community?.name}@${new URL(post.post.ap_id).host}`} target="_blank"  className={`${styles.communityImage}`}>
                                {post?.community?.icon ?
                                    <Image 
                                        src={post?.community?.icon} alt="" height={40} width={40} 
                                        className=" overflow-hidden object-cover w-full h-full"
                                        style={{ borderRadius: "50%" }} />
                                    :
                                    <div className={`${styles.communityIconFill}`}></div>
                                }
                            </Link>
                            <div className={`${styles.headerMetadataContent}`}>
                                <Link 
                                    href={`/c/${post?.community?.name}@${new URL(post.post.ap_id).host}`} 
                                    className={`${styles.sub}`}><span className="font-bold capitalize">{post.community.name}</span> <span className="font-light text-xs">@{new URL(post.post.ap_id).host}</span></Link>
                                <span className={`${styles.dividerDot}`}></span>
                                <div className={`${styles.user}`}> 
                                    <Username user={post.creator} baseUrl={baseUrl} /> 
                                    <div className="dividerDot"></div>
                                    <div className={`${styles.date}`}><FormatDate date={new Date(post.post.published)} /></div>
                                    {post.post.featured_local && <span className="material-symbols-outlined text-sm text-green-500">push_pin</span>}
                                </div>
                            </div>
                            
                        </div>
                        
                        <Link 
                            onClick={onClick} href={postUrl} shallow
                            className={`${styles.headerTitle}`}
                        >
                            <h2 className={`${styles.title}`}>{post.post.name}</h2>
                        </Link>
                        

                        {post?.post?.nsfw && <span className=" bg-red-400 text-red-950 rounded-full p-2 py-1 text-xs font-bold w-fit">NSFW</span>}
                        <span className={`${styles.headerLink}`}></span>
                    </div>
                </div>
                <div className={`${styles.content}`}>

                    {/* Display Overlay if post has no media */}
                    {   !post?.post?.embed_title && // 100% dont display content overlay
                        !post?.post?.url?.endsWith(".html") && // 100% dont display content overlay
                        !post.post.thumbnail_url &&  // maybe display content overlay
                        !(post?.post?.url && isImageType(post?.post?.url)) && // dont display
                        <div className={`${styles.contentOverlay}`} style={{ display: hasMedia ? "none" : "block" }}></div>
                    }

                    {/* Display Body if post has body and is not a Link */}
                    {post?.post?.body && !(post?.post?.embed_title || post?.post?.url?.endsWith(".html")) && <div className={`${styles.body} ${markdownStyle.markdown}`}><RenderMarkdown>{post?.post?.body}</RenderMarkdown></div> }

                    {/* Display Link if post has link e.g. Article case */}
                    {(post?.post?.embed_title || post?.post?.url?.endsWith(".html")) &&
                        <div className={`${styles.postBodyEmbed}`}>
                            <div className="flex flex-col gap-1">
                                <div className={`${styles.postBodyEmbedTitle}`}>{post?.post?.embed_title}</div>
                                <div className={`${styles.postBodyEmbedDescription}`}>{post?.post?.embed_description}</div>
                            </div>
                           <div className={`${styles.link} flex justify-start items-start w-full p-1 pl-0`}>
                                <a className="a text-xs" href={post.post.url} target="_blank">{post.post.url}</a>
                            </div>
                            {/* Display Thumbnail */}
                            {post.post.thumbnail_url &&
                                <Link className={`${styles.image}`} href={post.post.thumbnail_url} target="_blank" >
                                    <AutoMediaType url={post.post.thumbnail_url} alt={post.post.name} nsfw={post?.post?.nsfw} />
                                </Link>
                            }
                        </div>
                        
                    }    

                    { /* Post has post url and no embedding,thus the url has to link to an Image -> Display Image */}
                    { post?.post?.url && !post?.post?.embed_title &&
                        <div className={`${styles.image}`}>
                            <AutoMediaType url={post?.post?.url} alt={post.post.name} nsfw={post?.post?.nsfw} />
                        </div>
                    }

                    {/* Display Embed Video */}
                    {post.post.embed_video_url &&
                        <div className={`${styles.video}`}>
                            <AutoMediaType url={post.post.embed_video_url} alt={post.post.name} nsfw={post?.post?.nsfw} />
                        </div>
                    }

                    
                </div>
                <div className={styles.footer}>
                    <div className="hidden max-md:flex"><Vote post={post} horizontal /></div> 
                    <div className={`${styles.footerInteractions}`}>
                        <button>{post?.counts?.comments > 0 && post?.counts?.comments}<span className="material-icons-outlined">chat_bubble_outline</span></button>
                        <button><span className="material-icons">bookmark_border</span></button>
                        <button><span className="material-icons-outlined">more_horiz</span></button>
                    </div>
                    
                </div>
            </div>

        </div>
        </>
    )
}