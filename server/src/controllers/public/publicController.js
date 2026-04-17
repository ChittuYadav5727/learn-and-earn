import { getChatbotResponse, getHomePageData, getVideoFeed } from '../../services/publicService.js';
import { getLearnEarnFeed } from '../../services/userService.js';
import { successResponse } from '../../utils/apiResponse.js';

export async function getHome(req, res) {
  const data = await getHomePageData();
  return successResponse(res, data);
}

export async function getCatalog(req, res) {
  const mode = req.query.mode === 'earn' ? 'earn' : 'learn';
  const data = await getLearnEarnFeed(mode);
  return successResponse(res, data);
}

export async function getVideos(req, res) {
  const data = await getVideoFeed();
  return successResponse(res, data);
}

export async function postChatMessage(req, res) {
  const data = await getChatbotResponse(req.body);
  return successResponse(res, data, 'Chatbot response generated');
}
