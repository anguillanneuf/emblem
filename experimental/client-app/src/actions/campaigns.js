// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getConfig } from '../utils/config.js';

const developmentUrl = getConfig().API_URL;
const isFlaskProxy = getConfig().IS_FLASK; 

export const fetchCampaign = createAsyncThunk('fetchCampaign', async (campaignId) => {
  let campaign;
  const campaignUrl = isFlaskProxy ? `${developmentUrl}/get_campaign?campaign_id=${campaignId}` :  `${developmentUrl}/campaigns/${campaignId}`;
  
  try {
    const response = await fetch(campaignUrl, {headers: {'access-control-allow-origin': '*'}});
    campaign = await response.json();
  } catch(e) {
    console.error(e);
  }
  return campaign;
});

export const fetchCampaignList = createAsyncThunk('fetchCampaignList', async () => {
  let campaigns;
  try {
    const response = await fetch(`${developmentUrl}/campaigns`, {headers: {'access-control-allow-origin': '*'}});
    campaigns = await response.json();
  } catch(e) {
    console.error(e);
  }
  return campaigns;
});
