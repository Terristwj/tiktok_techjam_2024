import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def encode_categorical_data(users_df):
    label_encoders = {}
    for column in ['nickname', 'biography', 'bio_link', 'is_verified']:
        le = LabelEncoder()
        users_df[column] = le.fit_transform(users_df[column])
        label_encoders[column] = le
    return users_df

def calculate_interaction_strength(users_df):
    # Define a function to calculate interaction strength
    def calculate_interaction_strength(row):
        return row['awg_engagement_rate'] + row['comment_engagement_rate'] + row['like_engagement_rate']

    # Apply the function to create the interaction strength
    users_df['interactionStrength'] = users_df.apply(calculate_interaction_strength, axis=1)

    # Let's assume each 'id' in the dataset is equivalent to 'contentId' and 'account_id' to 'personId'
    users_df = users_df.rename(columns={'id': 'contentId', 'account_id': 'personId'})

    # Combine features into a single string for textual features
    users_df['combined_features'] = users_df.apply(lambda row: ' '.join([
        str(row['nickname']), str(row['biography']), str(row['bio_link']), str(row['top_videos']), str(row['url'])
    ]), axis=1)

    return users_df

users_df = pd.read_csv('./data/TikTok profiles dataset (Public web data).csv')
users_df = encode_categorical_data(users_df)
users_df = calculate_interaction_strength(users_df)

tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(users_df['combined_features'])

# Compute cosine similarity matrix
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Function to get recommendations based on a given person's interactions
def get_recommendations(person_id, num_recommendations=5):
    idx = users_df.index[users_df['personId'] == person_id].tolist()[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:num_recommendations+1]  # Exclude the first one as it is the same item
    user_indices = [i[0] for i in sim_scores]
    return users_df.iloc[user_indices]

def get_recommendation_videos(person_id, num_recommendations=5):
    recommendations = get_recommendations(person_id, num_recommendations)

    final_recommendations = []
    for recommendation in recommendations['top_videos'].tolist():
        final_recommendations += recommendation.split(',')

    return final_recommendations

# recommendations = get_recommendations('a2_9r')
# recommendations = get_recommendations("a3536363773")
# recommendations = get_recommendation_videos("mybeautifulfantasy")

# First recommendation
# print(recommendations, len(recommendations["top_videos"]))
